const query = async (query: string, url: string) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query}),
    };

    let data;

    try {
        data = await fetch(url, options)
            .then(res => {
                return res.json()
            })
            .then(res => {
                return res.data;
            });
    } catch (e) {
        console.log('Error de conexión: ', e);
        data = null;
    }

    return data;
};


export const GraphQl = {query: query};