
<template>

  <div id="app">
<Navbar1></Navbar1>
    <div id="main">
      <!-- left section -->

      <section id="sidebar" class="sidebar text-center">
        <div class="logo mt-3">
          <a class="navbar-brand brand-logo" href="index.html">
            <img src="./assets/logo.jpeg" height="50px" width="50px"  alt="logo" />
          </a>
        </div>
        <hr width="80%">
        <ul>
          <li><router-link to="/"><b-icon-folder2-open class="mr-2"></b-icon-folder2-open><span>Monthly Overwiew</span></router-link></li>
          <li><router-link to="/advice"><b-icon-people class="mr-2"></b-icon-people><span>Financial Advice</span></router-link></li>
        </ul>
      </section>
      <!-- right section -->
      <section id="content" class="content">
        <router-view/>
        <!-- footer => component -->
        <Footer></Footer>
      </section>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: {
    Footer
  }
}
</script>

<style scoped>
  @media screen and (max-width: 600px) {
    #main {
      display: grid;
      min-height: 100vh;
      grid-auto-flow: row;
    }
    #sidebar {
      position: absolute;
      bottom: 0;
      width: 100vw;
      background: #333;
      z-index: 10;
    }
    #sidebar div.logo, #sidebar hr {
      display: none;
    }
    #sidebar ul {
      text-align: center;
    }
    #sidebar ul li {
      display: inline;
      font-size: 2em;
      margin: 0px 50px;
    }
    #sidebar ul li span{
      display: none;
    }
    #footer {
      padding-bottom: 75px;
    }
  }

  @media screen and (min-width: 600px) {
    #main {
      display: grid;
      min-height: 100vh;
      grid-template-columns: 2fr 8fr;
    }
  }
  .content {
    background-color: #fafafa;
    height: 100vh;
    overflow-y: auto;
  }
  ul {
    list-style-type: none;
    text-align: left;
  }
  li {
    margin-bottom: 10px;
  }
  li a{
    color: #aaa;
    text-decoration: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  li a:hover {
    color: steelblue;
  }
</style>
