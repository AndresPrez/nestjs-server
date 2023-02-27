This is the source code of Typescript server.

The project is built with the [@nestjs](https://docs.nestjs.com) framework implementing a "modular" organization of the application components.
This architecture is recommended by @nestjs and provides multiples advantages for IoC, unit testing, code organization, code readability and more.

Each module in app should be self-contained, meaning that everything related to such module should be within the same folder. For example,
the `user` folder represents the User Module which contains the modules' controllers and services.
