import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Card, Button, Row, Col, Modal, Form, Input, Tag, Tooltip, Icon, Checkbox} from 'antd';
const { Meta } = Card;
const FormItem = Form.Item;

class DateFilter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            checkedList: this.props.datecheckboxes,
            indeterminate: false,
            checkAll: true,
            datecheckboxes:this.props.datecheckboxes
        };
        this.onChange = this.onChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
    }
    
    onChange = (checkedList) => {
        this.setState({
          checkedList,
          indeterminate: !!checkedList.length && (checkedList.length < this.props.datecheckboxes.length),
          checkAll: checkedList.length === this.props.datecheckboxes.length,
        });
        const datecheckboxes = this.props.datecheckboxes;
        const datechecked = {};
        for(let i = 0; i < datecheckboxes.length; i++)
        {
            datechecked[datecheckboxes[i]] = false;
        }
        for(let i = 0; i < checkedList.length; i++)
        {
            datechecked[checkedList[i]] = true;
        }
        this.props.handleDateCheck(datechecked);
      }
      
      onCheckAllChange = (e) => {
        this.setState({
          checkedList: e.target.checked ? this.props.datecheckboxes : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
        const datecheckboxes = this.props.datecheckboxes;
        const datechecked = {};
        if(e.target.checked)
        {
            for(let i = 0; i < datecheckboxes.length; i++)
            {
                datechecked[datecheckboxes[i]] = true;
            }
        }
        else
        {
            for(let i = 0; i < datecheckboxes.length; i++)
            {
                datechecked[datecheckboxes[i]] = false;
            }
        }
        this.props.handleDateCheck(datechecked);
      }
    render() {
        return (
          <div>
            <div style={{ borderBottom: '1px solid #E9E9E9' }}>
              <Checkbox
                indeterminate={this.state.indeterminate}
                onChange={this.onCheckAllChange}
                checked={this.state.checkAll}
              >
                Check all
              </Checkbox>
            </div>
            <br />
            <Checkbox.Group options={this.state.datecheckboxes} value={this.state.checkedList} onChange={this.onChange} />
          </div>
        );
      }
}
class CheckboxFilter extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state={checkedList:this.props.checkedList,checkboxeschecked:this.props.checkboxchecked,indeterminate:false,checkAll:true};
        this.onChange = this.onChange.bind(this);
        this.onCheckAllChange = this.onCheckAllChange.bind(this);
    }
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < this.props.checkboxes.length),
            checkAll: checkedList.length === this.props.checkboxes.length,
        });
        const checkboxes = this.props.checkboxes;
        const checkboxchecked = {};
        for(let i = 0; i < checkboxes.length; i++)
        {
            checkboxchecked[checkboxes[i]] = false;
        }
        for(let i = 0; i < checkedList.length; i++)
        {
            checkboxchecked[checkedList[i]] = true;
        }
        this.props.handleCheckboxChecked(checkboxchecked);
    }
    onCheckAllChange = (e) => {
        this.setState({
          checkedList: e.target.checked ? this.props.checkboxes : [],
          indeterminate: false,
          checkAll: e.target.checked,
        });
        const checkboxes = this.props.checkboxes;
        const checkboxchecked = {};
        if(e.target.checked)
        {
            for(let i = 0; i < checkboxes.length; i++)
            {
                checkboxchecked[checkboxes[i]] = true;
            }
        }
        else
        {
            for(let i = 0; i < checkboxes.length; i++)
            {
                checkboxchecked[checkboxes[i]] = false;
            }
        }
        this.props.handleCheckboxChecked(checkboxchecked);
    }
    render()
    {
        const checkboxes = this.props.checkboxes;
        return(
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        id="checkall"
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <Checkbox.Group style={{ width: '20%' }} onChange={this.onChange} options={this.props.checkboxes} value={this.state.checkedList} >
            <Row>
                {checkboxes.map((checkbox) => {
                    const checkElem = (
                        <Col span={8}><Checkbox id={checkbox} value={checkbox}>{checkbox}</Checkbox></Col>
                    );
                    return checkElem;
                })}
            </Row>
        </Checkbox.Group>
            </div>
        );
    }
        
}
class TagHomework extends React.Component
{
    state = {
        tags: this.props.tags,
        inputVisible: false,
        inputValue: '',
      };
    
      handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
        this.props.handleTagChange(tags,this.props.cnt);
      }
    
      showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
      }
    
      handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
      }
    
      handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        const checkedList = this.props.checkedList;
        let tags = this.state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags,
          inputVisible: false,
          inputValue: '',
        });
        checkedList.push(inputValue);
        this.props.handleTagChange(tags,this.props.cnt);
        this.props.handleCheckedList(checkedList);
      }
    
      saveInputRef = input => this.input = input
    
      render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
          <div>
            {tags.map((tag,index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== 0} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
            {inputVisible && (
              <Input
                ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handleInputChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" /> New Tag
              </Tag>
            )}
          </div>
        );
      }
    }

class CardHomework extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {title:this.props.title,visible:false,oldtitle:this.props.title}
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    showModal()
    {
        this.setState({visible: true,});
    }
    handleOk(e){
        let newname = document.getElementById(this.state.title).value;
        const oldname = this.state.oldtitle;
        this.setState({visible: false, title:newname, oldtitle:newname});
        this.props.handleNameChange(oldname,newname);
    }
    handleCancel(e){
        this.setState({visible: false,title:this.state.oldtitle});
    }
    handleChange(e)
    {
        this.setState({title:e.target.value});
    }
    render(props)
    {
        return (
            <div>
            <Card
                hoverable={true}
                bordered={false}
                actions={[<Button type="primary" onClick={this.showModal}>modify</Button>]}
                >
                <Meta 
                    title={<p align="center">{this.state.title}</p>}/>  
                <p>
                    完成日期：{this.props.date}
                </p>
                 <Form>
                 <FormItem>
                        <TagHomework cnt={this.props.cnt} checkedList={this.props.checkedList} handleTagChange={this.props.handleTagChange} handleCheckedList={this.props.handleCheckedList} tags={this.props.tags}/>
                    </FormItem>
                </Form>
            </Card>
                <Modal title="修改名称"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}>
                <Form>
                    <FormItem>
                        <Input 
                            id={this.state.title} 
                            type="text" 
                            value={this.state.title} 
                            onChange={this.handleChange}
                        />
                    </FormItem>
                </Form>
                </Modal> 
            </div>
        );
    }
}
class TopField extends React.Component
{
    constructor(props)
    {
        super(props);
        let checkboxes = [];
        let datecheckboxes = [];
        const homework = this.props.homework;
        //tagfilter
        
        for(let index in homework)
        {
            for(let index2 in homework[index]['tags'])
            {
                if(checkboxes.indexOf(homework[index]['tags'][index2]) === -1)
                {
                    checkboxes.push(homework[index]['tags'][index2]);
                }
            }
        }
        let checkboxchecked = [];
        for(let i = 0; i < checkboxes.length; i++)
        {
            checkboxchecked[checkboxes[i]] = true;
        }
        //datefilter
        for(let index in homework)
        {
            let tempdatearr = homework[index]['date'].split('-');
            tempdatearr[1] = tempdatearr[1] + "月";
            if(datecheckboxes.indexOf(tempdatearr[1]) === -1)
            {
                datecheckboxes.push(tempdatearr[1]);
            }
        }
        let datechecked = [];
        for(let i = 0; i < datecheckboxes.length; i++)
        {
            datechecked[datecheckboxes[i]] = true;
        }
        this.state = {
            homework:this.props.homework,
            checkboxes:checkboxes,
            checkedList:checkboxes,
            checkboxchecked:checkboxchecked,
            datecheckboxes:datecheckboxes,
            datechecked:datechecked
        };
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleCheckedList = this.handleCheckedList.bind(this);
        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
        this.handleDateCheck = this.handleDateCheck.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleTagChange(newtags,cnt)
    {
        const homework = this.state.homework;
        homework[cnt]['tags'] = newtags;
        this.setState({homework:homework});
        this.handleCheckboxChange(this.state.homework);
    }
    handleCheckboxChange(homework)
    {
        const checkboxes = [];
        for(let index in homework)
        {
            for(let index2 in homework[index]['tags'])
            {
                if(checkboxes.indexOf(homework[index]['tags'][index2]) === -1)
                {
                    checkboxes.push(homework[index]['tags'][index2]);
                }
            }
        }
        this.setState({checkboxes: checkboxes});
    }
    handleCheckedList(checkedList)
    {
        this.setState({checkedList:checkedList});
    }
    handleCheckboxCheck(checkboxchecked)
    {
        this.setState({checkboxchecked:checkboxchecked});
    }
    handleDateCheck(datechecked)
    {
        console.log(datechecked);
        this.setState({datechecked:datechecked});
    }
    handleNameChange(oldname,newname)
    {
        const homework = this.state.homework;
        for(let i = 0; i < homework.length; i++)
        {
            if(oldname === homework[i]['name'])
            {
                homework[i]['name'] = newname;
                break;
            }
        }
        this.setState({homework:homework});
        console.log(homework);
    }
    render(props)
    {
        const homework = this.state.homework;
        const checkboxes = this.state.checkboxes;
        const checkboxchecked = this.state.checkboxchecked;
        const datechecked = this.state.datechecked;
        var cards = [];
        var tempcard = [];
        var flag = false;
        console.log(checkboxchecked);
        for(let index in homework)
        {
            for(let tag in checkboxchecked)
            {
                if(homework[index]['tags'].indexOf(tag) !== -1 && checkboxchecked[tag])
                {
                    flag = true;    
                    break;
                }
            }
            let tempdatearr = homework[index]['date'].split('-');
            tempdatearr[1] = tempdatearr[1] + "月";
            let tempdate = tempdatearr[1];
            console.log(tempdate);
            console.log(datechecked);
            console.log(datechecked[tempdatearr[1]]);
            if(flag && datechecked[tempdatearr[1]])
            {
                cards.push(
                    <Col span={8}>
                    <CardHomework 
                    key={homework[index]['name']}
                    cnt={homework[index]['id']} 
                    checkedList={this.state.checkedList} 
                    handleTagChange={this.handleTagChange} 
                    handleCheckedList={this.handleCheckedList} 
                    handleNameChange={this.handleNameChange}
                    title={homework[index]['name']} 
                    tags={homework[index]['tags']} 
                    date={homework[index]['date']}/> 
                    </Col>               
                );
            }
            flag = false;
        }
        console.log(cards);
        
        return (
            <div>
                <CheckboxFilter key="CheckboxFilter" checkboxes={checkboxes} checkedList={this.state.checkedList} checkboxchecked={checkboxchecked} handleCheckboxChecked={this.handleCheckboxCheck}/>
                <br/>
                <DateFilter key="DateFilter" handleDateCheck={this.handleDateCheck} datecheckboxes={this.state.datecheckboxes} datechecked={this.state.datechecked}/>
                <Row gutter={16}>
                    {cards}
                </Row>
            </div>
        );
    }
}
class App extends React.Component
{
    render()
    {
        return (
            <TopField key="TopField" homework={homework}/>
        );
        
    }
}

var homework = [
    {id:0,name:"线性代数",tags:['数学','难度A'],date:"2017-10-23"},
    {id:1,name:"高等数学",tags:['数学','难度B'],date:"2017-11-24"},
    {id:2,name:"C语言",tags:['计算机','难度B'],date:"2017-12-25"},
    {id:3,name:"概率论",tags:['数学','概率'],date:"2017-11-10"}    
];
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
