export default class NewsService {
    getNewsSmall() {
        return fetch('demo/data/news-small.json')
            .then((res) => res.json())
            .then((d) => d.data);
    }

    getAllNews(q) {
        const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/news`);
        url.searchParams.append('q', q);

        return fetch(url)
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    }
}
