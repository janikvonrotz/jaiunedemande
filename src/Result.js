import { Grid, Row, Col } from "react-flexbox-grid";

const placeholder = "https://entraide-romande.ch/wp-content/uploads/2020/04/Entraide-romande-Logo-018-site-web-anousdejouer.png"

function Result(props) {
  return (
    <Grid fluid>
      <Row className="center-xs">
        <Col>
          <a className="link-large" href="">Redémarrer le chat</a>
        </Col>
      </Row>
      <Row className="center-xs">
        <Col>
          <p>Vos résultats:</p>
        </Col>
      </Row>
      <Row>
        {props.articles.map((article) => (
          <Col key={article.no} xs={12} sm={6} md={4} lg={3}>
            <div className="box">
              <p dangerouslySetInnerHTML={{__html: article.title }}/>
              { article.image ? <img style={{width: '100%'}} src={article.image} /> : <img style={{width: '100%'}} src={placeholder} /> }            
              <a target="_blank" href={article.url}>Lien</a>
            </div>
          </Col>
        ))}
      </Row>
    </Grid>
  );
}

export default Result;
