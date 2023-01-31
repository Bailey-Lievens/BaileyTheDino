# Setting up arguments
ARG INDEX_PATH
ARG IMAGE_PHP_VERSION
ARG IMAGE_NODE_VERSION

# PHP image install with Apache
FROM php:${IMAGE_PHP_VERSION}-apache

# Re setting the arguments because for some dumb reason they get removed after a FROM statement
# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG INDEX_PATH
ARG IMAGE_NODE_VERSION

# Node install
RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install npm@latest -g && \
    npm install n -g && \
    n ${IMAGE_NODE_VERSION}

# Composer install
RUN apt-get update && apt-get -y --no-install-recommends install git \
    && php -r "readfile('http://getcomposer.org/installer');" | php -- --install-dir=/usr/bin/ --filename=composer \
    && rm -rf /var/lib/apt/lists/*

# Other php extensions to install
RUN docker-php-ext-install pdo_mysql

# Yarn install
RUN npm install yarn --global

# Enable Apache2 rewrite
RUN a2enmod rewrite

# Changing document root to specific folder
RUN sed -ri -e "s!/var/www/html!${INDEX_PATH}!g" /etc/apache2/sites-available/*.conf
RUN sed -ri -e "s!/var/www/!${INDEX_PATH}!g" /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

