<script lang="ts">

    let showPassword = false;
    let passwordInput : HTMLInputElement;
</script>


<section>
<form action="">
    <input type="text" name="email" id="email" placeholder="Email">
    <input bind:this={passwordInput} type="{showPassword ? "text" : "password"}" name="password" id="password" placeholder="Password">
    <div class="show-pass">
    <input bind:checked={showPassword} type="checkbox" name="showPass" id="showPass">
    <label for="showPass">Show Password</label>

</div>
</form>
<a href="/reset-password">Forgot Your Password?</a>
</section>
<style>
    section {
        padding: clamp(0.05rem, 1vw, 2rem) clamp(0.1rem, 4vw, 3rem);
    }
    .show-pass {
        height: max-content;
        display: flex;
        gap: 2ch;
        align-items: center;
    }
    form {
        display: grid;
        gap: 0.5em;
    }
   
    label {
        margin: 0;
        padding: 0;
    }
    a {
        color: aliceblue;
    }
</style>