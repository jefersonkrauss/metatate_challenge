FROM --platform=linux/amd64 ruby:2.7.2

ARG environment

ENV APP_HOME /app

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 7FCC7D46ACCC4CF8

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev unzip groff less sudo \
  && curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh \
  && apt-get install shared-mime-info \
  &&  bash nodesource_setup.sh \
  && sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' \
  && curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/apt.postgresql.org.gpg \
  && apt-get update -qq && apt-get install -y nodejs yarn  postgresql-client-11 \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list \
  && sudo apt update \
  && sudo apt install yarn -y

WORKDIR $APP_HOME

COPY Gemfile* $APP_HOME/

RUN gem install bundler --no-document -v 2.4.22

RUN if [ -n "$environment" ] && [ "$environment" = "development" ]; then \
      bundle install --jobs=4 ; \
    else \
      bundle install --jobs=4 --without development test ; \
    fi

COPY ./task-manager-backend-ruby-on-rails .

# Add a script to be executed every time the container starts. (it run the migrations)
COPY docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh

#ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]