<template>
  <div id="main-banner">
    <h1>Seus ingressos, sua experiência</h1>
  </div>
</template>
<script>
export default {
  name: "BannerComponent",
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

#main-banner {
  background-image: url("https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1400&fit=crop");
  height: 300px;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  font-weight: 700;
  color: antiquewhite;
  background: #0d0d0d;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}
</style>