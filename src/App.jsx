import { useState } from 'react';
import { Space, Button, Radio } from 'antd';
import { ExportOutlined, RestOutlined, FileImageOutlined } from '@ant-design/icons';
import { Form, Input } from 'antd';
import { MENU_BG } from './utils/constant';
import { exportMenu } from './utils';
import './App.css';

const MENU_MEAL_MAP = {
  '01main': '主菜',
  '02slide': '配菜',
  '03half': '荤菜',
  '04vegetable': '素菜',
  '05staple': '主食',
}

function App() {
  const [menuBg, setMenuBg] = useState(MENU_BG.MENU_BG_03);
  const [update, forceUpdate] = useState();
  const [form] = Form.useForm();

  const watchType = Form.useWatch('type', form);

  const generateMenu = () => {
    forceUpdate(Date.now());
    console.log(form.getFieldsValue());
  }

  return (
    <div className='container'>
      <div className='left-container'>
        <div className='config-container'>
          <div className='card-container'>
            {Object.keys(MENU_BG).map(key => (
               <img onClick={() => setMenuBg(MENU_BG[key])} className={`card-img ${key === menuBg.key && 'active'}`} key={key} alt="logo" src={MENU_BG[key].image} />
            ))}
          </div>
          <div className='form-container'>
            <h2>菜单配置</h2>
            <Form
              layout="vertical"
              form={form}
              name="menu-form"
              initialValues={{ type: 'boxed-meal', staple: '米饭、馒头' }}
            >
              <Form.Item name="type" label="菜单类型" rules={[{ required: true }]}>
                <Radio.Group
                  name="type"
                  options={[
                    {
                      label: '盒饭',
                      value: 'boxed-meal',
                    },
                    {
                      label: '便当',
                      value: 'bento',
                    }
                  ]}
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
              <Form.Item name="01main" label={"主菜"} rules={[{ required: true }]}>
                <Input placeholder='请输入主菜名称' />
              </Form.Item>
              {
                watchType === 'bento' ? (
                  <Form.Item name="02slide" label="配菜" rules={[{ required: true }]}>
                    <Input placeholder='请输入配菜名称' />
                  </Form.Item>
                ) : (
                  <>
                    <Form.Item name="03half" label="荤菜" rules={[{ required: true }]}>
                      <Input placeholder='请输入荤菜名称' />
                    </Form.Item>
                    <Form.Item name="04vegetable" label="素菜" rules={[{ required: true }]}>
                      <Input placeholder='请输入素菜名称' />
                    </Form.Item>
                  </>
                )
              }
              <Form.Item name="05staple" label="主食" rules={[{ required: true }]}>
                <Input placeholder='请输入主食名称' />
              </Form.Item>
            </Form>
          </div>
        </div>
        <footer>
          <Space>
            <Button icon={<RestOutlined />} danger ghost>重置</Button>
            <Button onClick={generateMenu} icon={<FileImageOutlined />} type="primary" ghost>生成菜单</Button>
            <Button onClick={exportMenu} icon={<ExportOutlined />} type="primary">导出菜单</Button>
          </Space>
        </footer>
      </div>
      <div className='right-container'>
        <div className='img-container'>
        {
          update && (
            <div className='menu-text-container' style={menuBg.style}>
              {
                menuBg.key === 'MENU_BG_03' ?
                  Object.keys(form.getFieldsValue()).filter(key => key !== 'type' && key !== '03half').sort().map(key =>  key === '04vegetable' ? (
                    <div className='row' key={key}>
                      {!menuBg.noLabel && <h2>{MENU_MEAL_MAP[key]}</h2>}
                      <p>{form.getFieldValue('03half')}</p>
                      <p>{form.getFieldValue(key)}</p>
                    </div>
                  ) : (
                    <div className='row' key={key}>
                      {!menuBg.noLabel && <h2>{MENU_MEAL_MAP[key]}</h2>}
                      <p>{form.getFieldValue(key)}</p>
                    </div>
                  ))
                :
                Object.keys(form.getFieldsValue()).filter(key => key !== 'type').map(key => (
                  <div className='row' key={key}>
                    {!menuBg.noLabel && <h2>{MENU_MEAL_MAP[key]}</h2>}
                    <p>{form.getFieldValue(key)}</p>
                  </div>
                ))
              }
            </div>
          )
        }
          <img alt="menu-bg" src={menuBg.image} />
        </div>
      </div>
    </div>
  );
}

export default App;
