module.exports = {
  async redirects() {
    return [
      {
        source: '/ssr',
        destination: '/ssr/panel1?mode=desktop',
        permanent: true,
      },
    ];
  },
};
