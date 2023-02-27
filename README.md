# Application Server


### Installing the application node modules:

`$> yarn`

### Running server locally with docker-compose (recommended):

`$> yarn dc:dev`

This should leave your NestJs application running in `localhost:3000` with dark mode swagger docs at `localhost:3000/docs`



### Dependency Description:

@nestjs/common: Common NestJS Framework functionalities

@nestjs/config: Config helper provided by NestJS.

@nestjs/core: Provides the NestFactory.

@nestjs/platform: Provides the Express Appliaction.

@nestjs/jwt: JWT helpers by NestJS for JWT authentication.

@nestjs/passport: NestJS Passport module to integrate with the authentication strategies of the 'passport' library.

@nestjs/swagger: Swagger decorators used by NestJS to construct the OPEN API swagger JSON.

"@prisma/client": CLI client to operate with Prisma ORM. 

@babel/cli: A required install for using babel. It allows the use of Babel from the terminal and is available as ./node_modules/.bin/babel.

@babel/core: Core Babel functionality. This is a required installation.

@babel/node: This works exactly like the Node.js CLI, with the added benefit of compiling with babel presets and plugins. This is required for use with nodemon.

@babel/plugin-transform-runtime: This helps to avoid duplication in the compiled output.

@babel/preset-env: A collection of plugins that are responsible for carrying out code transformations.

@babel/register: This compiles files on the fly and is specified as a requirement during tests.

@babel/runtime: This works in conjunction with @babel/plugin-transform-runtime.
