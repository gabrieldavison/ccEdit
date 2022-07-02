#!/bin/bash
(cd ccEdit-client; npm run dev) & (cd ccEdit-view; npm run dev) & (cd ccEdit-server; npm start)