import { useState } from 'react';
import { Space, Button } from 'antd';
import { ExportOutlined, RestOutlined } from '@ant-design/icons';

import { MENU_BG } from './utils/constant';
import { exportMenu } from './utils';
import './App.css';

function App() {
  const [menuBg, setMenuBg] = useState(MENU_BG.MENU_BG_02);

  return (
    <div className='container'>
      <div className='left-container'>
        <div className='config-container'>
          <div className='card-container'>
            {Object.keys(MENU_BG).map(key => (
               <img onClick={() => setMenuBg(MENU_BG[key])} className={`card-img ${key === menuBg.key && 'active'}`} key={key} alt="logo" src={MENU_BG[key].image} />
            ))}
          </div>
        </div>
        <footer>
          <Space>
            <Button icon={<RestOutlined />} type="primary" ghost>重置</Button>
            <Button onClick={exportMenu} icon={<ExportOutlined />} type="primary">导出菜单</Button>
          </Space>
        </footer>
      </div>
      <div className='right-container'>
        <div className='img-container'>
          <img alt="menu-bg" src={menuBg.image} />
        </div>
      </div>
    </div>
  );
}

export default App;
