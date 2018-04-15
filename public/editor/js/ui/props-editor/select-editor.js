import PropsFieldWrapper from './props-field-wrapper.js';

class SelectEditor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};

        this.onToggle = this.onToggle.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    onToggle() {
       this.setState({toggled:!this.state.toggled});
    }

    onSelect(item) {
         this.props.onChange(PropsFieldWrapper.surrogateChnageEvent(item.value));
    }
    
    renderItem(i) {
        return R.div({key:i.name, className:'select-item clickable', onClick:() => {
            this.onSelect(i);
        }}, i.name);
    }

    render () {
        
        var list = this.props.field.select;

        var body;

        if(this.state.toggled) {
            body = list.map(this.renderItem);
        } else {
            body = list.find((i)=>{if(i.value === this.props.value)return i}).name + ' ▾';
        }
        return R.div({className:'select-editor', onClick:this.onToggle}, body);
    }

}

export default SelectEditor