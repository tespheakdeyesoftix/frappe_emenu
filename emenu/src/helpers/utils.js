import { compile } from 'vue'; // assuming you have this available
import { modalController } from '@ionic/vue';

export function urlDecode(encodedString) {
  const params = new URLSearchParams(encodedString);
  const result = {};


  for (const [key, value] of params.entries()) {
    try {
      // Try to parse JSON values (like "user")
      result[key] = JSON.parse(decodeURIComponent(value));
    } catch {
      // Fallback to normal decoded string
      result[key] = decodeURIComponent(value);
    }
  }

  return result;
}



export function getTelegramUserData() {
  if (import.meta.env.VITE_MODE == 'development') {
    return parseUrlEncodedToJson(defaultUserData)
  } else {
    return parseUrlEncodedToJson(window.Telegram.WebApp.initData)

  }

}

export function stripHtmlTags(text) {
  return text?.replace(/<[^>]*>/g, '');

}



export function createDynamicComponent(template, data) {
  return {
    data() {
      return data;
    },
    render: compile(template),
  };
}


export async function openModal(component, options = {}) {
  options.breakpoints = options.breakpoints || [0,0.25, 0.5, 0.75, 1],
    options.initialBreakpoint = options.initialBreakpoint || 0.5,
    options.backdropBreakpoint = options.backdropBreakpoint || 0.25


  const modal = await modalController.create({
    component: component,
    ...options
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    alert("hello")
  }
}


export function toJson(data='{}'){
  try{
if(data){
    return JSON.parse(data)
  }else {
    return {}
  }
  }catch{
    return {}
  }
  
}