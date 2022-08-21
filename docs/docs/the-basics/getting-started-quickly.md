---
sidebar_position: 2
---

### Run Practica.js from the Command Line


Run practica CLI and generate our default app (you can customize it using different flags):

```bash
npx @practica/create-node-app immediate --install-dependencies
```

✨ And you're done! That's it. The code's all been generated.

We also have a CLI interactive mode:

```bash
npx @practica/create-node-app interactive
```

Note that for now, it can generate an app that is based on Express and PostgreSQL only. Other options will get added soon


<br />

### Start the Project

```bash
cd {your chosen folder name}
npm install
```

Then choose whether to start the app:

```bash
npm run
```

or run the tests:

```bash
npm test
```

Pretty straight forward, right?


You just got a Node.js Monorepo solution with one example component/Microservice and multiple libraries. Based on this hardened solution you can build a robust application. The example component/Microservice is located under: *{your chosen folder name}/services/order-service*. This is where you'll find the API and a good spot to start your journey from.

<br />

### Next Steps

- ✅ Start coding. The code we generate is minimal by design and based on known libraries. This should help you get up to speed quickly.
- ✅ Read our ['coding with practica'](https://practica.dev/the-basics/coding-with-practica/) guide.
- ✅ Master it by reading our [docs at https://practica.dev](https://practica.dev).