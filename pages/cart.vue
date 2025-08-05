<template>
  <div class="bg-white max-w-[1440px] w-full mx-auto px-4 py-12">
    <div v-if="cart.items.length === 0" class="flex flex-col items-center justify-center min-h-[400px] text-center">
      <p class="text-[#C4C4C4] text-[36px] sm:text-[48px] font-[300] mb-6">Ваш кошик порожній</p>
      <router-link
        to="/market"
        class="font-light w-full text-[16px] max-w-[480px] uppercase text-center text-[#102840] border-[#102840] border-[0.5px] py-4 px-0 mb-[20px] hover:bg-[#102840] hover:text-white active:bg-[#6d849a] active:text-white"
      >
        Продовжити покупки
      </router-link>
    </div>
    <div v-else>
      <div
        v-for="item in cart.items"
        :key="item.id + '-' + item.size"
        class="border-b py-4 flex justify-between items-center w-full"
      >
        <div class="flex gap-4 items-start">
          <img
            :src="`${item.image}`"
            alt=""
            class="w-[95px] h-[110px] object-cover"
          />
          <div class="flex flex-col w-full min-w-[249px]">
            <div class="flex justify-between">
              <p class="font-[300] text-[14px] text-[#102840]">{{ item.name }}</p>
              <div
                class="font-[700] text-[16px] text-center text-[#252525] sm:hidden block"
              >
                {{ item.price * item.quantity }} €
              </div>
            </div>
            <div
              class="sm:pt-[30px] pt-[5px] font-[300] text-[14px] text-[#102840] text-start"
            >
              {{ item.productNumber }}
            </div>
            <div
              class="sm:hidden flex justify-between gap-[15px] items-center pt-[15px]"
            >
              <div
                class="w-[32px] h-[32px] rounded-full border border-[#252525] flex-col items-center justify-center sm:hidden flex"
              >
                <div
                  class="w-[24px] h-[24px] rounded-full"
                  :style="{ backgroundColor: item?.color.color }"
                ></div>
              </div>
  
              <select
                v-model="item.size"
                class="border px-4 py-2 text-sm text-[#102840] bg-white sm:hidden block"
              >
                <option
                  v-for="size in sizeMap[item.id]"
                  :key="size.Name"
                  :value="size.Name"
                >
                  {{ size.Name }}
                </option>
              </select>
  
              <div class="sm:hidden flex items-center border border-[#102840]">
                <button
                  @click="cart.updateQuantity(item.id, item.size, -1)"
                  class="px-1 py-1 text-[#102840] text-[18px]"
                >
                  −
                </button>
                <span class="min-w-[40px] text-center text-[#102840] text-[16px]">
                  {{ item.quantity }}
                </span>
                <button
                  @click="cart.updateQuantity(item.id, item.size, 1)"
                  class="px-1 py-1 text-[#102840] text-[18px]"
                >
                  +
                </button>
              </div>
  
              <div class="text-right sm:hidden flex items-center gap-[37px]">
                <div
                  class="font-[700] text-[16px] text-center text-[#252525] sm:block hidden"
                >
                  {{ item.price * item.quantity }} €
                </div>
                <button @click="cart.removeFromCart(item.id, item.size)">
                  <img src="/trash.svg" alt="remove" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-[32px] h-[32px] rounded-full  flex-col items-center justify-center sm:flex hidden"
        >
          <div
            class="w-[24px] h-[24px] rounded-full"
            :style="{ backgroundColor: item?.color.color }"
          ></div>
        </div>
  
        <select
          v-model="item.size"
          class="border px-4 py-2 text-sm text-[#102840] bg-white sm:block hidden"
        >
          <option
            v-for="size in sizeMap[item.id]"
            :key="size.Name"
            :value="size.Name"
          >
            {{ size.Name }}
          </option>
        </select>
  
        <div class="sm:flex hidden items-center border border-[#102840]">
          <button
            @click="cart.updateQuantity(item.id, item.size, -1)"
            class="px-1 py-1 text-[#102840] text-[18px]"
          >
            −
          </button>
          <span class="min-w-[40px] text-center text-[#102840] text-[16px]">
            {{ item.quantity }}
          </span>
          <button
            @click="cart.updateQuantity(item.id, item.size, 1)"
            class="px-1 py-1 text-[#102840] text-[18px]"
          >
            +
          </button>
        </div>
  
        <div class="text-right sm:flex hidden items-center gap-[37px]">
          <div
            class="font-[700] text-[16px] text-center text-[#252525] sm:block hidden"
          >
            {{ item.price * item.quantity }} €
          </div>
          <button @click="cart.removeFromCart(item.id, item.size)">
            <img src="/trash.svg" alt="remove" class="w-4 h-4" />
          </button>
        </div>
      </div>
  
      <!-- Итого -->
      <div class="text-right font-bold mt-4">
        До сплати: {{ cart.totalPrice }} €
      </div>
  
      <div
        class="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-[60px] max-w-[1440px] w-full sm:mt-[110px] mt-[40px] mx-auto px-4 py-12"
      >
        <!-- Левая часть: форма -->
        <div>
          <h2 class="text-[#252525] text-[20px] font-[300] mb-[30px]">
            Оформлення замовлення
          </h2>
  
          <!-- Персональні дані -->
          <h3 class="font-light text-[16px] text-[#252525] mb-[20px]">
            Персональні дані:
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <input
                type="text"
                placeholder="Ваше ім’я*"
                class="border border-[#252525] h-[50px] px-4 text-sm w-full"
                v-model="form.name"
              />
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">*</p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Ваше прізвище*"
                class="border border-[#252525] h-[50px] px-4 text-sm w-full"
                v-model="form.surname"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Ваш e-mail*"
                class="border border-[#252525] h-[50px] px-4 text-sm w-full"
                v-model="form.email"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Ваш телефон*"
                class="border border-[#252525] h-[50px] px-4 text-sm w-full"
                v-model="form.phone"
              />
            </div>
          </div>
  
          <!-- Спосіб доставки -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div class="font-light text-[16px] text-[#252525] mb-2">
                Україною:
              </div>
              <label
                class="flex gap-2 items-center font-light text-[16px] text-[#252525] mb-2"
              >
                <input
                  type="radio"
                  name="ukr"
                  value="nova"
                  v-model="form.delivery"
                />
                Нова Пошта — 1–2 дні
              </label>
              <label
                class="flex gap-2 items-center font-light text-[16px] text-[#252525]"
              >
                <input
                  type="radio"
                  name="ukr"
                  value="ukrposhta"
                  v-model="form.delivery"
                />
                Укрпошта — 2–5 днів
              </label>
            </div>
            <div>
              <div class="font-light text-[16px] text-[#252525] mb-2">
                Міжнародна доставка:
              </div>
              <label
                class="flex gap-2 items-center font-light text-[16px] text-[#252525] mb-2"
              >
                <input
                  type="radio"
                  name="intl"
                  value="global-ukrposhta"
                  v-model="form.delivery"
                />
                Укрпошта — 1–3 тижні / $30
              </label>
              <label
                class="flex gap-2 items-center font-light text-[16px] text-[#252525]"
              >
                <input
                  type="radio"
                  name="intl"
                  value="global-nova"
                  v-model="form.delivery"
                />
                Нова Пошта (Global) — 3–7 днів / $60
              </label>
            </div>
          </div>
  
          <!-- Адреса -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Місто*"
              class="border border-[#252525] h-[50px] px-4 text-sm"
              v-model="form.city"
            />
            <input
              type="text"
              placeholder="Відділення пошти*"
              class="border border-[#252525] h-[50px] px-4 text-sm"
              v-model="form.office"
            />
          </div>
  
          <!-- Спосіб оплати -->
          <div class="mb-6">
            <div class="font-light text-[16px] text-[#252525] mb-2">
              Оплатити замовлення можна одним із наступних способів
            </div>
            <div class="flex sm:flex-row flex-col justify-between">
              <div class="flex flex-col gap-2">
                <p class="font-[250] text-[16px] text-[#252525]">
                  Повна передплата через
                </p>
                <div class="flex gap-[15px]">
                  <img
                    class="border p-[5px] border-[#ededed] rounded-[4px]"
                    src="/applepay.svg"
                  />
                  <img
                    class="border p-[5px] border-[#ededed] rounded-[4px]"
                    src="/gpay.svg"
                  />
                  <img
                    class="border p-[5px] border-[#ededed] rounded-[4px]"
                    src="/paypal.svg"
                  />
                </div>
              </div>
              <div class="flex flex-col">
                <label
                  class="flex sm:flex-row flex-col sm:pt-0 pt-[25px] gap-2 sm:items-center items-baseline text-sm"
                >
                  <div class="flex items-center gap-2">
                    <input type="radio" value="card" v-model="form.payment" />
                    <p class="font-[250] text-[16px] text-[#252525]">
                      Грошовим переказом Visa/MasterCard
                    </p>
                  </div>
                  <div class="flex sm:pt-0 pt-[18px]">
                    <img src="/visa.svg" class="inline-block ml-1" />
                    <img src="/mastercard.svg" class="inline-block ml-1" />
                  </div>
                </label>
                <label
                  class="flex flex-row sm:pt-0 pt-[25px] gap-2 sm:items-center items-baseline text-sm"
                >
                  <input type="radio" value="cod" v-model="form.payment" />
                  <p class="font-[250] text-[16px] text-[#252525]">
                    Накладений платіж
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Правая часть: Сума и кнопка -->
        <div
          class="border border-[#ccc] px-[33px] h-full max-h-[404px] sm:mt-[100px] mt-[48px]"
        >
          <div
            class="text-center flex items-center justify-center pt-[50px] mb-4 text-[#102840] text-[20px] font-semibold"
          >
            <svg
              width="110"
              height="21"
              viewBox="0 0 110 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M95.4821 20.5427V3.98976H101.938C103.388 3.98976 104.626 4.21835 105.65 4.67553C106.675 5.1327 107.463 5.79482 108.015 6.66187C108.567 7.52893 108.843 8.56152 108.843 9.75963C108.843 10.9577 108.567 11.9903 108.015 12.8574C107.463 13.7087 106.675 14.3629 105.65 14.8201C104.626 15.2773 103.388 15.5059 101.938 15.5059H96.7827L97.8468 14.4181V20.5427H95.4821ZM106.549 20.5427L102.34 14.5363H104.87L109.126 20.5427H106.549ZM97.8468 14.6546L96.7827 13.4959H101.867C103.38 13.4959 104.523 13.1727 105.296 12.5263C106.084 11.8642 106.478 10.942 106.478 9.75963C106.478 8.57728 106.084 7.66293 105.296 7.01658C104.523 6.37023 103.38 6.04705 101.867 6.04705H96.7827L97.8468 4.8647V14.6546Z"
                fill="#102840"
              />
              <path
                d="M88.1614 20.5427V3.98976H90.5261V20.5427H88.1614Z"
                fill="#102840"
              />
              <path
                d="M75.7746 20.7318C74.5134 20.7318 73.3389 20.519 72.2512 20.0933C71.1792 19.6677 70.249 19.0765 69.4608 18.3198C68.6726 17.5473 68.0578 16.6488 67.6163 15.6241C67.1749 14.5994 66.9542 13.4801 66.9542 12.2662C66.9542 11.0523 67.1749 9.93301 67.6163 8.90831C68.0578 7.8836 68.6726 6.9929 69.4608 6.23619C70.249 5.46372 71.1792 4.86466 72.2512 4.43902C73.3232 4.01337 74.4976 3.80055 75.7746 3.80055C77.0357 3.80055 78.1944 4.01337 79.2507 4.43902C80.3227 4.8489 81.2528 5.44008 82.041 6.21255C82.845 6.96925 83.4598 7.85995 83.8855 8.88466C84.3269 9.90936 84.5476 11.0365 84.5476 12.2662C84.5476 13.4958 84.3269 14.623 83.8855 15.6477C83.4598 16.6724 82.845 17.571 82.041 18.3435C81.2528 19.1002 80.3227 19.6913 79.2507 20.117C78.1944 20.5269 77.0357 20.7318 75.7746 20.7318ZM75.7746 18.6272C76.6889 18.6272 77.5323 18.4696 78.3048 18.1543C79.093 17.839 79.7709 17.3976 80.3384 16.8301C80.9217 16.2468 81.371 15.5689 81.6863 14.7964C82.0174 14.0239 82.1829 13.1805 82.1829 12.2662C82.1829 11.3518 82.0174 10.5084 81.6863 9.73595C81.371 8.96348 80.9217 8.29348 80.3384 7.72595C79.7709 7.14266 79.093 6.69337 78.3048 6.37807C77.5323 6.06278 76.6889 5.90514 75.7746 5.90514C74.8444 5.90514 73.9853 6.06278 73.197 6.37807C72.4246 6.69337 71.7467 7.14266 71.1634 7.72595C70.5801 8.29348 70.1229 8.96348 69.7919 9.73595C69.4766 10.5084 69.3189 11.3518 69.3189 12.2662C69.3189 13.1805 69.4766 14.0239 69.7919 14.7964C70.1229 15.5689 70.5801 16.2468 71.1634 16.8301C71.7467 17.3976 72.4246 17.839 73.197 18.1543C73.9853 18.4696 74.8444 18.6272 75.7746 18.6272Z"
                fill="#102840"
              />
              <path
                d="M58.4392 20.7318C57.178 20.7318 55.972 20.5426 54.8212 20.1643C53.6704 19.7702 52.7639 19.2657 52.1018 18.6509L52.9768 16.8064C53.6073 17.3582 54.4113 17.8153 55.3887 18.1779C56.3662 18.5405 57.383 18.7218 58.4392 18.7218C59.4009 18.7218 60.1812 18.6115 60.7803 18.3908C61.3793 18.17 61.8207 17.8705 62.1045 17.4922C62.3883 17.0981 62.5302 16.6566 62.5302 16.1679C62.5302 15.6004 62.341 15.1432 61.9626 14.7964C61.6 14.4496 61.1192 14.1737 60.5201 13.9688C59.9369 13.7481 59.2905 13.5589 58.5811 13.4012C57.8717 13.2436 57.1544 13.0623 56.4292 12.8574C55.7198 12.6366 55.0656 12.3608 54.4665 12.0297C53.8832 11.6987 53.4103 11.2572 53.0477 10.7055C52.6851 10.1379 52.5038 9.41277 52.5038 8.52995C52.5038 7.67866 52.7245 6.89831 53.1659 6.1889C53.6231 5.46372 54.3167 4.88831 55.2469 4.46267C56.1927 4.02125 57.3909 3.80055 58.8412 3.80055C59.8029 3.80055 60.7566 3.92667 61.7025 4.1789C62.6484 4.43114 63.4681 4.79372 64.1618 5.26666L63.3814 7.15843C62.672 6.68549 61.9232 6.34655 61.135 6.1416C60.3467 5.9209 59.5821 5.81054 58.8412 5.81054C57.9111 5.81054 57.1465 5.92878 56.5475 6.16525C55.9484 6.40172 55.507 6.71701 55.2232 7.11113C54.9552 7.50525 54.8212 7.94666 54.8212 8.43536C54.8212 9.01866 55.0025 9.48371 55.3651 9.83054C55.7435 10.1774 56.2243 10.4532 56.8076 10.6582C57.4066 10.8631 58.0609 11.0523 58.7703 11.2257C59.4797 11.3834 60.1891 11.5647 60.8985 11.7696C61.6237 11.9745 62.2779 12.2425 62.8612 12.5736C63.4603 12.9046 63.9411 13.3461 64.3037 13.8978C64.6663 14.4496 64.8475 15.159 64.8475 16.0261C64.8475 16.8616 64.619 17.6419 64.1618 18.3671C63.7046 19.0765 62.9952 19.6519 62.0336 20.0933C61.0877 20.519 59.8896 20.7318 58.4392 20.7318Z"
                fill="#102840"
              />
              <path
                d="M33.5747 11.1312H42.0876V13.1412H33.5747V11.1312ZM33.7875 18.4854H43.4355V20.5427H31.4228V3.98976H43.1044V6.04705H33.7875V18.4854Z"
                fill="#102840"
              />
              <path
                d="M17.7327 11.1312H26.2456V13.1412H17.7327V11.1312ZM17.9455 18.4854H27.5935V20.5427H15.5808V3.98976H27.2624V6.04705H17.9455V18.4854Z"
                fill="#102840"
              />
              <path
                d="M5.58571 20.7318C4.6083 20.7318 3.69395 20.5269 2.84266 20.117C1.99136 19.7071 1.29772 19.116 0.761719 18.3435L2.13324 16.7355C2.59042 17.3661 3.10277 17.8548 3.6703 18.2016C4.25359 18.5327 4.89206 18.6982 5.58571 18.6982C7.47747 18.6982 8.42335 17.5789 8.42335 15.3403V6.04705H2.44065V3.98976H10.7644V15.2221C10.7644 17.0666 10.323 18.446 9.44017 19.3603C8.57311 20.2747 7.28829 20.7318 5.58571 20.7318Z"
                fill="#102840"
              />
              <path
                d="M49.1873 0H51.9251L48.0374 7.45347H46.2305L49.1873 0Z"
                fill="#102840"
              />
            </svg>
          </div>
          <div class="mb-2 text-[#252525] text-[14px] mt-[63px]">ДОСТАВКА:</div>
          <div class="text-[14px] font-[700] text-[#252525] mt-[5px]">
            За тарифами перевізника
          </div>
          <div class="flex justify-between items-center pt-[25px]">
            <div class="text-[14px] text-[#252525]">До сплати:</div>
            <div class="text-[16px] font-[700] text-[#252525]">
              {{ cart.totalPrice }} грн
            </div>
          </div>
  
          <button
            @click="submitOrder"
            class="border border-[#102840] w-full py-3 text-[#102840] uppercase text-[14px] font-light tracking-wide mt-[15px] hover:bg-[#102840] hover:text-white active:bg-[#6d849a] active:text-white"
          >
            Оформити замовлення
          </button>
  
          <!-- Ошибка только одно сообщение за раз -->
          <div
            v-if="errors.name || errors.surname || errors.email || errors.phone || errors.city || errors.office || errors.delivery"
            class="text-red-500 text-[14px] text-center mt-2 font-light"
          >
            <span v-if="errors.name">{{ errors.name }}</span>
            <span v-else-if="errors.surname">{{ errors.surname }}</span>
            <span v-else-if="errors.email">{{ errors.email }}</span>
            <span v-else-if="errors.phone">{{ errors.phone }}</span>
            <span v-else-if="errors.city">{{ errors.city }}</span>
            <span v-else-if="errors.office">{{ errors.office }}</span>
            <span v-else-if="errors.delivery">{{ errors.delivery }}</span>
          </div>
  
          <div class="text-center text-[14px] underline text-[#102840] mt-[35px]">
            Увійти до особистого кабінету
          </div>
          <div class="text-center text-[14px] underline text-[#102840] mt-[20px]">
            Зареєструватися
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cart = useCartStore();
import { getProductSize } from "~/queries/market";

const sizeMap = ref({});

const errors = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  city: '',
  office: '',
  delivery: '',
});


const fetchSizes = async (productId) => {
  const { execute, data } = useLazyAsyncQuery(getProductSize, {
    products: productId,
  });

  await execute(); // запускаем вручную

  sizeMap.value[productId] = data.value?.sizes || [];
};

onMounted(() => {
  cart.items.forEach((item) => {
    fetchSizes(item.id);
  });
});

const form = reactive({
  name: "",
  surname: "",
  email: "",
  phone: "",
  city: "",
  office: "",
  delivery: "",
  payment: "",
});

function submitOrder() {
  // Сброс ошибок
  for (const key in errors) {
    errors[key] = '';
  }

  if (!form.name) {
    errors.name = '*Введіть Ваше ім’я';
    return;
  }
  if (!form.surname) {
    errors.surname = '*Введіть Ваше прізвище';
    return;
  }
  if (!form.email) {
    errors.email = '*Введіть Ваш e-mail';
    return;
  }
  if (!form.phone) {
    errors.phone = '*Введіть Ваш телефон';
    return;
  }
  if (!form.city) {
    errors.city = '*Введіть Ваше місто';
    return;
  }
  if (!form.office) {
    errors.office = '*Введіть Ваше відділення пошти';
    return;
  }
  if (!form.delivery) {
    errors.delivery = '*Оберіть спосіб доставки';
    return;
  }

  console.log('✅ Order submitted:', form, cart.items);
}

</script>
