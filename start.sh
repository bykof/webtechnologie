#!/bin/bash

npm install --prefix file_storage && \
npm install --prefix liabilities && \
npm install --prefix usermanagement && \
npm install --prefix webapp

npm start --prefix file_storage & \
npm start --prefix liabilities & \
npm start --prefix usermanagement & \
npm start --prefix webapp