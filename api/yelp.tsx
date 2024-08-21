import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization : 'Bearer Ukvsbe5UFNIxxjiQrAYV-Zt0rLQLJkkXtJSdWde4L2MjiwwKArq1XzcRKAOqEShKvsjk89EipSNj-o1lO6Lqi5dMqMQoVBvGMlwphQGz85L_osJc_ovdQB_S6-PCZnYx'
    }
});