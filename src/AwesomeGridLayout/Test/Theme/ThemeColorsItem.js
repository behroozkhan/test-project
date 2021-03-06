import React from "react";
import './ThemeManager.css';
import Image from "../../Menus/CommonComponents/Image";
import {getColorScheme} from "../../AwesomwGridLayoutHelper";
import HexColorPicker from "./HexColorPicker";

export default class ThemeColorsItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    onEditClick = (paletteName, key, color) => (e) => {
        this.setState({
            toChange: {
                paletteName, key, color
            }
        })
    };

    onChangeColor = (color) => {
        let {siteData, pageData, editor, item} = this.props;
        let {toChange} = this.state;
        siteData.theme.Colors.items[toChange.paletteName][toChange.key] = color;

        if (toChange.key === "main") {
            siteData.theme.Colors.calculated = false;
        }

        toChange.color = color;
        this.setState({toChange});
        editor.setState({reload: true});
    };

    render() {
        let {siteData, pageData, editor, item} = this.props;
        if (!siteData)
            return null;

        return (
            <div className="ThemeColorsItemRoot">
                <span className="ThemeTextItemName">
                    {item.name}
                </span>

                <div className="ThemeColorsItemDetail">
                    <div className="ThemeColorsItemDetailMain" style={{
                            backgroundColor: getColorScheme(item.main)["3"]
                        }}
                        onClick={this.onEditClick(item.name, "main", getColorScheme(item.main)["3"])}
                    >

                        <Image
                            className="ThemeColorsItemDetailOverlay"
                            style={{opacity: 1}}
                            src={'static/icon/edit-white.svg'}
                            width={18}
                            height={18}
                        />
                    </div>
                    <div className="ThemeColorsItemDetailSecondary">
                        <div className="ThemeColorsItemDetailSecondaryItem" style={{
                            backgroundColor: item["1"] || getColorScheme(item.main)["1"],
                            borderTopRightRadius: 4,
                            borderBottomRightRadius: 4
                        }}
                             onClick={this.onEditClick(item.name, "1", item["1"] || getColorScheme(item.main)["1"])}
                        >

                            <Image
                                className="ThemeColorsItemDetailOverlay"
                                src={'static/icon/edit-white.svg'}
                                width={18}
                                height={18}
                            />
                        </div>
                        <div className="ThemeColorsItemDetailSecondaryItem" style={{
                            backgroundColor: item["2"] || getColorScheme(item.main)["2"]
                        }}
                             onClick={this.onEditClick(item.name, "2", item["2"] || getColorScheme(item.main)["2"])}
                        >

                            <Image
                                className="ThemeColorsItemDetailOverlay"
                                src={'static/icon/edit-white.svg'}
                                width={18}
                                height={18}
                            />
                        </div>
                        <div className="ThemeColorsItemDetailSecondaryItem" style={{
                            backgroundColor: item["3"] || getColorScheme(item.main)["3"]
                        }}
                             onClick={this.onEditClick(item.name, "3", item["3"] || getColorScheme(item.main)["3"])}
                        >

                            <Image
                                className="ThemeColorsItemDetailOverlay"
                                src={'static/icon/edit.svg'}
                                width={18}
                                height={18}
                            />
                        </div>
                        <div className="ThemeColorsItemDetailSecondaryItem" style={{
                            backgroundColor: item["4"] || getColorScheme(item.main)["4"]
                        }}
                             onClick={this.onEditClick(item.name, "4", item["4"] || getColorScheme(item.main)["4"])}
                        >

                            <Image
                                className="ThemeColorsItemDetailOverlay"
                                src={'static/icon/edit.svg'}
                                width={18}
                                height={18}
                            />
                        </div>
                        <div className="ThemeColorsItemDetailSecondaryItem" style={{
                            backgroundColor: item["5"] || getColorScheme(item.main)["5"],
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4
                        }}
                             onClick={this.onEditClick(item.name, "5", item["5"] || getColorScheme(item.main)["5"])}
                        >

                            <Image
                                className="ThemeColorsItemDetailOverlay"
                                src={'static/icon/edit.svg'}
                                width={18}
                                height={18}
                            />
                        </div>
                    </div>
                </div>

                {
                    this.state.toChange &&
                    <HexColorPicker
                        onClose={() => this.setState({toChange: undefined})}
                        color={this.state.toChange.color}
                        onChangeComplete={ this.onChangeColor }
                        disableAlpha
                        width={224}
                    />
                }
            </div>
        )
    }
}
