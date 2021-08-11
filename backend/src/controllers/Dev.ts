import {Request, Response} from 'express';
import axios from 'axios';
import to from '@utils/to';
import Dev from '@models/Dev';

async function index(request: Request, response: Response) {
  const {user} = request.headers;

  const loggedDev = await Dev.findById(user);

  const users = await Dev.find({
    $and: [
      {_id: {$ne: user}},
      {_id: {$nin: loggedDev.likes}},
      {_id: {$nin: loggedDev.dislikes}},
    ],
  }).sort({_id: -1});

  return response.json(users);
}

async function store(request: Request, response: Response) {
  const {username} = request.body;

  const userExists = await Dev.findOne({user: username});

  if (userExists) {
    console.log(`User ${username} already exists.`);
    return response.json(userExists);
  }

  const [data, error] = await to(axios.get(`https://api.github.com/users/${username}`));

  if (error) {
    return response.status(404).json('This GitHub username does not exists!');
  }

  const {name, bio, avatar_url: avatar} = data;

  const [, databaseError] = await to(
      Dev.create({
        name,
        user: username,
        bio,
        avatar,
      }),
  );

  if (databaseError) {
    return response
        .status(500)
        .json('An error ocurred on create user, sorry :(');
  }

  console.log(`User ${username} created.`);

  return response.sendStatus(201);
}

export default {index, store};
