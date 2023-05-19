export const swaggerConfig = {
  openapi: "3.0.3",
  info: {
    title: "API Cadastro Cliente Madtrat",
    author: "https://github.com/CaioHAlves",
    contact: {
      name: "API Madtrat",
      url: "https://caiohalves.vercel.app",
      email: "caio.henriquealves@outlook.com"
    }
  },
  paths: {
    "/users/create": {
      post: {
        tags: ["User"],
        description: "Cria um usuario",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Users"
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "Usuario Criado com sucesso"
          }
        }
      }
    },
  },
  components: {
    schemas: {
      Users: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nome",
            example: "User Teste"
          },
          email: {
            type: "string",
            description: "Email",
            example: "user@teste.com"
          },
          tell: {
            type: "string",
            description: "Telefone/Celular",
            example: "19912345678"
          },
          password: {
            type: "string",
            description: "Senha usuario",
            example: "123456"
          }
        }
      }
    }
  }
}