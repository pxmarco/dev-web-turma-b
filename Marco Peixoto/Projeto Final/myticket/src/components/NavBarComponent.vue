<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img src="@/assets/logo.png" id="logo" alt="MyTicket" />
      </router-link>
      <div id="nav-links">
        <router-link to="/menu">Eventos</router-link>
        <router-link to="/pedidos">Ingressos</router-link>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBarComponent",
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

#nav {
  background-color: #0d0d0d;
  border-bottom: 3px solid #7c3aed;
  padding: 14px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Poppins', sans-serif;
}

#logo-url {
  text-decoration: none;
}

#logo {
  width: 130px;
  height: 130px;
  object-fit: contain;
  transition: 0.2s;
}

#logo:hover {
  width: 100px;
  height: 100px;
}

#nav-links {
  display: flex;
  gap: 30px;
}

#nav a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.2s;
}

#nav a:hover,
#nav a.router-link-active {
  color: #a78bfa;
}
</style>