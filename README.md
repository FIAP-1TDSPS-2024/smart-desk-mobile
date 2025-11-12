# SmartDesk - Mobile App

Uma aplicação mobile para monitoramento e controle inteligente de mesa ergonômica desenvolvida com React Native e Expo.

## 👥 Integrantes do Grupo – CATECH

- **RM559622**: Daniel Santana Corrêa Batista
- **RM561144**: Jonas de Jesus Campos de Oliveira
- **RM559336**: Wendell Nascimento Dourado

## Repositório

```
https://github.com/FIAP-1TDSPS-2024/smart-desk-mobile
```

## Mocks

- [Login/Cadastro utilizando Async Storage](./src/contexts/AuthContext.tsx)
- [Serviços de autenticação](./src/services/authService.ts)

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento e build
- **TypeScript** - Para tipagem estática
- **Expo Image** - Para carregamento otimizado de imagens
- **Expo Vector Icons** - Para ícones
- **React Navigation** - Para navegação entre telas
- **Async Storage** - Para persistência de dados local

## 📱 Funcionalidades

- ✅ Sistema de autenticação (Login/Cadastro)
- ✅ Tela de medições para monitoramento
- ✅ Perfil do usuário
- ✅ Dados pessoais editáveis
- ✅ Tela Premium com funcionalidades exclusivas
- ✅ Configurações do aplicativo
- ✅ Navegação por tabs
- ✅ Interface responsiva
- ✅ Design moderno e intuitivo
- ✅ Persistência de sessão

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Loading.tsx
│   ├── PasswordInput.tsx
│   └── index.ts
├── contexts/           # Contextos da aplicação
│   └── AuthContext.tsx
├── screens/            # Telas da aplicação
│   ├── LoginScreen.tsx
│   ├── SignupScreen.tsx
│   ├── MeasurementsScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── PersonalDataScreen.tsx
│   ├── PremiumScreen.tsx
│   └── SettingsScreen.tsx
└── services/           # Serviços e APIs
    └── authService.ts
```

## 🛠️ Como Executar

1. **Instalar as dependências:**

   ```bash
   npm install
   ```

2. **Executar o projeto:**

   ```bash
   # Para iOS
   npm run ios

   # Para Android
   npm run android

   # Para Web
   npm run web

   # Para todos (abre o Expo DevTools)
   npm start
   ```

3. **Para testar em dispositivo físico:**
   - Instale o app Expo Go no seu celular
   - Escaneie o QR Code que aparece no terminal/browser

## 📦 Scripts Disponíveis

- `npm start` - Inicia o servidor Expo
- `npm run android` - Executa no emulador Android
- `npm run ios` - Executa no simulador iOS
- `npm run web` - Executa no navegador web

## 🎨 Design

O app segue um design moderno com:

- Paleta de cores consistente (tema indigo/purple)
- Interface intuitiva e responsiva
- Componentes reutilizáveis e customizáveis
- Suporte a diferentes tamanhos de tela
- Navegação fluida com tabs e stack navigation
- Feedback visual para interações do usuário

## 🔐 Sistema de Autenticação

- Login com email e senha
- Cadastro de novos usuários
- Validação de dados
- Persistência de sessão com AsyncStorage
- Logout seguro

## 📱 Compatibilidade

- **iOS**: 13.0+
- **Android**: API 21+ (Android 5.0)
- **Web**: Todos os navegadores modernos

## 🚀 Próximos Passos

- [ ] Integração com API real para backend
- [ ] Sincronização de dados com dispositivo IoT (mesa inteligente)
- [ ] Notificações push para lembretes ergonômicos
- [ ] Gráficos e estatísticas de uso
- [ ] Sistema de metas e conquistas
- [ ] Modo escuro
