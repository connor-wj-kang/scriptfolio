import { FC, useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
    <html>
      <head>
        <style>html { background-color: white; }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!iframe.current) {
      return;
    }

    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current!.contentWindow?.postMessage(code, "*");
    }, 50);
  }, [code]);

  let content;
  if (err) {
    content = <div className="h-full w-full text-red-500">{err}</div>;
  } else {
    content = (
      <iframe
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
        loading="lazy"
        title="code-preview"
        className="h-full w-full duration-1000 animate-in fade-in"
      />
    );
  }

  return content;
};

export default Preview;
