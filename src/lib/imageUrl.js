import configs from "../../configs";

const urlBuilder = (src) => {
    const fullUrl = configs.STRAPI_URL + src
    return fullUrl
}

export default urlBuilder;