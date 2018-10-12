const express = require('express');
const redis = require("redis");
const redisClient = redis.createClient(6379, 'ec2-54-183-229-94.us-west-1.compute.amazonaws.com');


redisClient.on('connect', () => (console.log("connected to Redis!")));

module.exports = redisClient;