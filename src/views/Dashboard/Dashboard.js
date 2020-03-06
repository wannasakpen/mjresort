import React, { Component, lazy, Suspense } from 'react'; 
import { Card, CardBody, CardHeader, Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col, Row} from 'reactstrap';
// import  {GlobalLogin}  from '../../loginservice/loginservice.js';
 



const items = [
  {
    src: 'https://scontent.fbkk8-2.fna.fbcdn.net/v/t1.0-9/15319196_1148240845257463_8246534288711963263_n.jpg?_nc_cat=107&_nc_oc=AQnUgPVLSkzHZUCwE43NYUea-HAlvTVe5t0Au9TXRWN2Dfm7N0BythwNBq7zN6J0RZ0&_nc_ht=scontent.fbkk8-2.fna&oh=7d8da821f31a976495016eb79cf51168&oe=5E8BC761',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: 'https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/14141609_1062372710510944_1950586602677968621_n.jpg?_nc_cat=102&_nc_oc=AQnyzb1EdC5s2ls0r0wttd2IiUsF2UaD8AWAFNMxJHnX816p_qu7yk13eqjE5LHd4iw&_nc_ht=scontent.fbkk12-3.fna&oh=b83b1a66814bf7cb0cd3b11e924020da&oe=5E4D0B03',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: 'https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/p720x720/50103872_1981110421970497_3860063198279368704_o.jpg?_nc_cat=104&_nc_oc=AQlZQGIrV0dEnUMMJa5XpLCj1_vffbhGRl6uBT3XxTCNF9ewqMF3eaAAucYYZqhdViI&_nc_ht=scontent.fbkk12-2.fna&oh=aef2a489b44204d2bb175a7df84a7173&oe=5E8AE065',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];



class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.state = {
      activeIndex: 0,
    };
  }

  componentDidMount() {
    

  };

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }




  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem  className="webkitcenter" onExiting={this.onExiting} onExited={this.onExited} key={item.src}>
          <img className="d-block w-60"   width="60%" src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    }); 
     
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader className="aligncenter"> 
                <strong>Welcome</strong> 
              </CardHeader>
              <CardBody>
                <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} ride="carousel">
                  {slides}
                </Carousel>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
