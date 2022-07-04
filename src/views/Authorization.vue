<template>
  <div class="authorization">
    <h1 class="authorization__header">LeadHit</h1>
    <form class="login-form" @submit.prevent="submit">
      <span 
        class="login-form__error-message"
        v-if="v$.form.id.$invalid && v$.form.$dirty"
      >
        ID сайта должен содержать 24 символа
      </span>
      <input
        type="text"
        class="login-form__input"
        name="login"
        placeholder="ID сайта"
        v-model="form.id"
      />
      <button type="submit" class="login-form__button">Войти</button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: 'Authorization',
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form: {
        id: '',
      },
      url: 'https://track-api.leadhit.io/client/test_auth',
    };
  },
  validations() {
    return {
      form: {
        id: { 
          required,
          minLength: minLength(24),
          maxLength: maxLength(24),
        },
      },
    };
  },
  methods: {
    async submit() {
      this.v$.form.$touch();
      if (this.v$.form.$error) {
        return;
      }
      const payload = { url: this.url, id: this.form.id };
      await this.login(payload);
      if (this.authKey) {
        this.$router.push('/analytics');
      }
    },
    ...mapActions({
      login: 'Auth/login',
    }),
  },
  computed: {
    ...mapGetters({
      authKey: 'Auth/getAuthKey',
    }),
  },
};
</script>

<style lang="scss">
.authorization {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  &__header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
}
.login-form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  align-items: center;
  &__error-message {
    position: absolute;
    top: 0;
    left: 8px;
    display: block;
    margin-bottom: 4px;
    width: 250px;
    font-size: 12px;
    color: #cc0000;
  }
  &__input {
    display: block;
    margin-bottom: 10px;
    padding: 0 8px;
    width: 250px;
    height: 40px;
    line-height: 40px;
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 0 1px #80bdff;
    transition: box-shadow 0.3s ease;
    &:focus {
      box-shadow: 0 0 0 3px #80bdff;
    }
  }
  &__button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    padding: 0;
    border: none;
    border-radius: 4px;
    outline: none;
    font-weight: 900;
    color: #fff;
    user-select: none;
    background-color: #0066ff;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #004ec2;
    }
  }
}
</style>