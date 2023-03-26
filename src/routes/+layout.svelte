
<script lang="ts">
    import { onMount } from 'svelte';
    import { initFirebase } from '../client/firebase';
    import { auth as authStore} from '../store/auth';

    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import Menu from '@smui/menu';
    import List, { Item, Text } from '@smui/list';
    import IconButton from '@smui/icon-button';
      
    let menu: Menu;

    let hasUser = false;
    let userName = "";

    let login = ()=>{
        console.log("T")
    };

    let signout = () => {
        
    }
  
    onMount(()=>{
        const {auth,onAuthStateChanged, signIn,signOutFromApp} = initFirebase();  
        login = signIn();
        signout = signOutFromApp();
        onAuthStateChanged(auth, (data:any)=>{
           if(data && data.email && data.uid) {
            console.log(data)
            authStore.set({
                userName: data.displayName,
                uid: data.uid,
                email: data.email,
                photo: data.photoURL,
            })
            hasUser = true;
           }else {
            authStore.set({});
            hasUser = false;
           }
        })


    });

  let prominent = false;
  let dense = false;
  let secondaryColor = false;


</script>

<style>
    @import url('/static/fonts/icons/css/fontello.css');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans&family=Sofia+Sans+Extra+Condensed&display=swap');

    footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        font-family: sans-serif;
        left: 0;
        background: #e3e3e3;
        padding: 8px;
    }

    footer nav {
        display: flex;
        justify-content: space-around;
    }

    nav a {
        display: flex;
        text-decoration: none;
        flex-direction: column;
        align-items: center;
    }

    a i {
        font-size: 22px;
        color: rgb(79, 79, 79);
    }

    nav a span {
        text-transform: uppercase;
        font-size: 10px;
        color: rgb(79, 79, 79);
    }

    .top-app-bar-container {
        width: 100%;
        overflow: hidden;
  }
</style>


<div class="top-app-bar-container">
    <TopAppBar
      variant="static"
      {prominent}
      {dense}
      color={secondaryColor ? 'secondary' : 'primary'}
    >
      <Row>
        <Section>
          <Title>GuessPL</Title>
        </Section>
        <Section align="end" toolbar>
            {#if $authStore?.userName}
            <IconButton class="material-icons"  on:click={() => menu.setOpen(true)}
                >account_circle</IconButton
              >
              <Menu bind:this={menu}>
                <List>
                  <Item on:SMUI:action={() => {signout()} }>
                    <Text>Logout</Text>
                  </Item>
                </List>
              </Menu>
            {/if}
         
        </Section>
      </Row>
    </TopAppBar>


</div>

{#if !hasUser}
    <button on:click={login} > Login with Google</button>
{:else}
    <slot></slot>   
{/if}

<footer>
   <nav>
        <a href="/">
            <i class="icon-home"></i>
            <span>Home</span>
        </a>
        <a href="/matches">
            <i class="icon-list-bullet"></i>
            <span>Matches</span>
        </a>
        <a href="/leaderboard">
            <i class="icon-award"></i>
            <span>Leaders</span>
        </a>
   </nav>
</footer>