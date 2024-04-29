function Legend() {
  return (
    <div style={{ textAlign: "center" }}>
      <div id="content-legend">
        <h2 className="title-legend">Légende</h2>
        <div className="row-legend">
          <div className="square-legend current" />
          <label className="label-legend">Prochaine lettre écrite</label>
        </div>
        <div className="row-legend">
          <div className="square-legend letter" />
          <label className="label-legend">Une lettre</label>
        </div>
        <div className="row-legend">
          <div className="square-legend space" />
          <label className="label-legend">Un espace</label>
        </div>
      </div>
    </div>
  );
}
export default Legend;
