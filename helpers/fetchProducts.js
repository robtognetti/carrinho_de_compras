const fetchProducts = async (item) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${item}`;
    const resposta = await fetch(url);
    const data = await resposta.json();
    return data;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
