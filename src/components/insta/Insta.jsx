import "./insta.css";
export default function Insta() {
  return (
    <div className="post">
      <div className="post-header">
        <img className="avatar" src="/images/avatar.webp" alt="avatar" />
        <span className="username">foreverlove</span>
      </div>

      <img className="post-image" src="/images/insta.webp" alt="post" />

      <div className="post-content">
        <div className="actions">
          <span>❤️</span>
          <span>💬</span>
          <span>📤</span>
        </div>

        <p className="likes">999 mil</p>

        <p className="description">
          <strong>foreverlove</strong> Вечная любовь
        </p>
      </div>
    </div>
  );
}
