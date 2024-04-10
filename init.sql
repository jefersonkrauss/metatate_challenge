-- Create this user in the docker-compose db, check the env variables for the web service in docker-compose file
CREATE USER task_manager WITH SUPERUSER CREATEDB PASSWORD 'password';