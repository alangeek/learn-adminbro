const express = require('express')
const AdminBro = require('admin-bro')
const expressAdminBro = require('@admin-bro/express')
const mongooseAdminBro = require('@admin-bro/mongoose')

// const llala = require('./src/components/dashboard')

const conexion = require('./database/db')

const User = require('./models/Usuario')
const Post = require('./models/Post')
const Consulta = require('./models/Consulta')

const PORT = process.env.PORT || 8080
const HOSTNAME = 'localhost'

const app = express()

// Connetion Database
conexion.once('open', () => console.log('Conexição mongoDB'))
conexion.once('error', () => console.log('Error de conexão mongoDB'))

// use mongoose in AdminBro adapter
AdminBro.registerAdapter(mongooseAdminBro)

// Customs menus sidebar
const managerNavigation = {
  name: 'Gerenciamento',
  icon: 'Dashboard'
}
const contentNavigation = {
  name: 'Acessibilidade',
  icon: 'Phone'
}

const userNavigation = {
  name: 'Usuarios',
  icon: 'User'
}

// config
const AdminBroOptions = {
  rootPath: '/painel',
  logoutPath: '/painel/sair',
  loginPath: '/painel/entrar',
  pages: {
    alanteste: {
      label: 'Alana'
    },
    another4444Page: {
      label: 'TypeScript page'
    }
  },

  resources: [
    {
      resource: User,
      options: {
        navigation: userNavigation,
        properties: {
          criado_em: {
            isVisible: { edit: false, list: true, show: true, filter: true }
          }
        }
      }
    },
    {
      resource: Post,
      options: { navigation: managerNavigation }
    },
    {
      resource: Consulta,
      options: {
        actions: {
          delete: {
            guard: 'Tem certeza de que deseja remover este item?'
          }
        },
        navigation: contentNavigation,
        properties: {
          detalhes: {
            type: 'richtext'
          }
        }
      }
    }
  ],
  // GLOBALS
  locale: {
    language: 'pt',
    translations: {
      actions: {
        new: 'Criar novo',
        list: 'Lista',
        edit: 'Editar',
        show: 'Exibir',
        delete: 'Excluir',
        bulkDelete: 'Deletar todos'
      },
      buttons: {
        save: 'Salvar'
      }
    }
  },
  branding: {
    companyName: 'Cmsfy',
    logo: 'https://i.imgur.com/cVWJU1c.png',
    softwareBrothers: false,
    favicon: 'https://i.imgur.com/pBAvM1h.png'
    // theme,
  },
  dashboard: {
    handler: async () => {
      return { some: 'Saida' }
    },
    component: AdminBro.bundle('./my-dashboard-component')
  }
}

const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)

// // Routes
// app.get('/', (req, res) => {
//   res.send('Dashboard com Node')
// })

app.listen(PORT, () => {
  console.log(`Server started on http://${HOSTNAME}:${PORT}/painel`)
})
