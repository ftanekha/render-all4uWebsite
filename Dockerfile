FROM php:8.0-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install PHP extensions
RUN docker-php-ext-install mysqli pdo_mysql

# Set working directory and copy files
WORKDIR /var/www/html/
COPY . .

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Expose port 80 and start Apache
EXPOSE 80
CMD ["apache2-foreground"]
