<template>
  <footer class="page-footer">
    <p class="footer-text">
      {{ t('footer.poweredBy') }} <a href="" class="footer-link">TERMIS</a>
      <br>
      {{ t('footer.toggleLanguage') }}
      <a class="footer-link" @click.prevent="useLocale.changeLanguage('en')">English🇬🇧 </a> -
      <a class="footer-link" @click.prevent="useLocale.changeLanguage('sw')">Kiswahili🇹🇿</a> -
      <a class="footer-link" @click.prevent="useLocale.changeLanguage('fr')">Francais🇫🇷</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useLocale } from '@/stores/store';

const { t } = useI18n();
</script>

<style scoped>
footer {
  width: 100%;
  font-size: smaller;
  text-align: center;
  padding: 0 10px;
}

@media (max-width: 1024px) {
  footer {
    position: relative;
    text-align: center;
  }
}
</style>
