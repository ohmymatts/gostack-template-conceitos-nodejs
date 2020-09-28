const express = require("express");
const cors = require("cors");

const { v4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { tech } = request.query;
  const result = tech
    ? repositories.filter(repository => repository.tech.includes(tech))
    : repositories

  return response.json(result);
});

app.post("/repositories", (request, response) => {
  const { title, url, tech } = request.body;
  const repository = { 
    id: v4(),
    title, 
    url, 
    tech, 
    likes: 0 };
  repositories.push(repository);
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, tech } = request.body;

  const repositorytIndex = repositories.findIndex(repository => repository.id === id);

  if (repositorytIndex < 0) {
    return response.status(400).json({ error: 'repository not found' });
  }

  const { likes } = repositories[repositorytIndex]

  const repository = {
    id,
    title,
    url,
    tech,
    likes
  };

  repositories[repositorytIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorytIndex = repositories.findIndex(repository => repository.id === id);

  if (repositorytIndex < 0) {
    return response.status(400).jspm({ error: "repository not found" });
  }

  repositories.splice(repositorytIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorytIndex = repositories.findIndex(repository => repository.id === id);

  if (repositorytIndex < 0) {
    return response.status(400).jspm({ error: "repository not found" });
  }

  const { url, tech, likes } = repositories[repositorytIndex]
  likes =  1

  const repository = {
    id,
    url,
    tech,
    likes
  };
  repositories[repositorytIndex] = repository;
});

module.exports = app;
