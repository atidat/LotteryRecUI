import axios from 'axios'
import { ref } from 'vue'

const weatherInfo = ref('今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。')

// TODO users must use their own amap key
const amapKey = 'f891d150df9e57529c23581cc384f6b7'

export const useWeatherInfo = () => {
    ip()
    return weatherInfo
}

export const ip = async() => {
    if (amapKey === '') {
        return false;
    }
    const res = await axios.get('https://restapi.amap.com/v3/ip?key=' + amapKey);
    if (res.data.adcode) {
        getWeather(res.data.adcode);
    }
}

const getWeather = async(code) => {
    const response = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=' + amapKey + '&extensions=base&city=' + code);
    if (response.data.status === '1' ) {
        const s = response.data.lives[0];
        weatherInfo.value = s.city + '： 天气：【' + s.weather + '】， 温度：【' + s.temperature + '摄氏度】， 风向：【' + s.winddirection + '】， 风力：【' + s.windpower + '】级， 空气湿度：【' + s.humidity + '】';
    }
}
