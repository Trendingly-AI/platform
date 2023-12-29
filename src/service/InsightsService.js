export default class InsightsService {
    getInsightsSmall() {
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/insights`)
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    }

    saveInsight(insight) {
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/insights`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insight)
        }).then((response) => response.json());
    }

    updateInsight(insight) {
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/insights/${insight._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(insight)
        }).then((response) => response.json());
    }

    deleteInsight(insightId) {
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/insights/${insightId}`, {
            method: 'DELETE'
        }).then((response) => response.json());
    }

    deleteInsights(insightIds) {
        const deleteRequests = insightIds.map((id) =>
            fetch(`${import.meta.env.VITE_API_BASE_URL}/insights/${id}`, {
                method: 'DELETE'
            })
        );
        return Promise.all(deleteRequests);
    }
}
