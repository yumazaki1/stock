/**
 * Copyright(c) Richard
 * Created by Richard on 17/6/27.
 * @author: Richard<xiaowei.hsueh@gmail.com>(https://www.gistop.com)
 * @description:
 */

import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import { COLORS } from '../../constant';

export default class SymbolItem extends React.Component {

    static propTypes = {
        symbol: PropTypes.object,
        isOpen: PropTypes.bool,
        favorites: PropTypes.object,
        onCreateOrder: PropTypes.func,
        onCreateUpOrder: PropTypes.func,
        onCreateDownOrder: PropTypes.func,
        onFavoriteClick: PropTypes.func,
        onRowClick: PropTypes.func
    };

    static defaultProps = {
        symbol: {},
        isOpen: false
    };

    constructor (props) {
        super(props);
    }

    onCreateOrder () {
        if (typeof this.props.onCreateOrder === 'function') {
            this.props.onCreateOrder(this.props.symbol);
        }
    }

    onCreateUpOrder () {
        if (typeof this.props.onCreateUpOrder === 'function' ){
            this.props.onCreateUpOrder(this.props.symbol);
        }
    }

    onCreateDownOrder () {
        if (typeof this.props.onCreateDownOrder === 'function') {
            this.props.onCreateDownOrder(this.props.symbol);
        }
    }

    onFavoriteClick (key) {
        if (typeof this.props.onFavoriteClick === 'function') {
            this.props.onFavoriteClick(this.props.symbol, key);
        }
    }

    onRowClick () {
        if (typeof this.props.onRowClick === 'function') {
            this.props.onRowClick(this.props.symbol);
        }
    }

    getTextColor (direction) {
        let v = '#ffffff';
        switch (direction) {
            case 1:
                v = COLORS.UP;
                break;
            case -1:
                v = COLORS.DOWN;
                break;
            default:
                v = COLORS.DEFAUL;
                break;
        }
        return v;
    }

    render () {
        let { symbol, favorites, isOpen } = this.props;
        let color = this.getTextColor(symbol.direction);
        let collapsedNode = <div className="row" style={{cursor: 'pointer'}} onClick={this.onRowClick.bind(this)}>
            <div className="cell">{symbol.name}
            </div><div className="cell" style={{color: color}}> {symbol.direction > 0 ? <b>▲</b> : <b>▼</b>} &nbsp;&nbsp;{symbol.price.toFixed(symbol.digits)}
            </div>
        </div>;

        let expandedNode = <div className="row-selected" style={{padding: '4px', backgroundColor: '#6a6a6a', borderRadius: '4px'}}>
            <div className="sub-row">
                <div className="cell">{symbol.name}
                </div><div className="cell" style={{color: color}}><b>▼</b>{symbol.price.toFixed(symbol.digits)}
                </div>
            </div>
            <div className="sub-row">
                <div className="cell">收藏</div>
                <div className="cell">
                    <Button className={ favorites.favorite1 ? 'btn-favorite selected' : 'btn-favorite'} onClick={this.onFavoriteClick.bind(this,'1')} size={'small'} >1</Button>
                    <Button className={ favorites.favorite2 ? 'btn-favorite selected' : 'btn-favorite'} onClick={this.onFavoriteClick.bind(this,'2')} size={'small'} >2</Button>
                    <Button className={ favorites.favorite3 ? 'btn-favorite selected' : 'btn-favorite'} onClick={this.onFavoriteClick.bind(this,'3')} size={'small'} >3</Button>
                </div>
            </div>
            <div className="sub-row">
                <div className="cell">盈利: 80%</div>
                <div className="cell">5.00 &nbsp; 投资 <br />
                    60秒
                </div>
            </div>

            <div className="sub-row">
                <Button className={'btn-default'} type={'primary'} size={'small'} onClick={this.onCreateOrder.bind(this)} style={{width: '100%'}}>下单</Button>
            </div>
            <div className="sub-row">
                <div className="cell" style={{padding: '0 4px 0 0'}}>
                    <Button size={'small'} onClick={this.onCreateUpOrder.bind(this)} style={{width: '100%'}} className={'btn-up'}>看涨</Button>
                </div>
                <div className="cell" style={{padding: '0 0 0 4px'}}>
                    <Button size={'small'} onClick={this.onCreateDownOrder.bind(this)} style={{width: '100%'}} className={'btn-down'}>看跌</Button>
                </div>
            </div>
            
        </div>;

        let node = isOpen ? expandedNode : collapsedNode;

        return node;
    }
}
