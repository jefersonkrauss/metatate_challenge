FROM ruby:2.7.2 AS base
LABEL authors="jefersonkrauss"

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client yarn

WORKDIR /app

COPY Gemfile Gemfile.lock ./

COPY docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh

RUN bundle install --jobs 4 --retry 5

# Development stage
FROM base AS development
COPY . /app
EXPOSE 3001
ENV RAILS_ENV=development
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3001"]

# Production stage
FROM base AS production
COPY . /app
RUN yarn install --check-files
RUN bundle exec rake assets:precompile
EXPOSE 3000
ENV RAILS_ENV=production
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
