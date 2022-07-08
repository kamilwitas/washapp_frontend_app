import React from 'react';
import { Layout } from 'antd';

import '../../styles/App.less';
import 'antd/dist/antd.less';

const ReleasePage = (props) => {
   
    const { Content, Footer } = Layout;
    return(
      <Layout className="site-layout">
      <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <h2 style={{textAlign: "left"}}>Wydanie prania.</h2>
        <p>Funkcjonalność w trakcie aktualizacji. Zapraszamy ponownie wkrótce. </p>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>AQUA LUX ©2022 Created by DevT</Footer>
     </Layout> 
  )};

  export default ReleasePage;