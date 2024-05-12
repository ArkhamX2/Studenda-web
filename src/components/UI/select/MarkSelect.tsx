/** @jsxImportSource @emotion/react */
import Select, { OptionProps, SelectInstance, StylesConfig } from 'react-select';
import { option } from '../../../types/OptionType';
import { FC, ForwardedRef, forwardRef } from 'react';
import classes from '../../../styles/admin.module.css';

const Option = (props: OptionProps<option>) => {
    const {
        children,
        className,
        cx,
        getStyles,
        isDisabled,
        isFocused,
        isSelected,
        innerRef,
        innerProps,
    } = props;
    return (
        <div
            ref={innerRef}
            css={getStyles('option', props)}
            className={cx(
                {
                    option: true,
                    'option--is-disabled': isDisabled,
                    'option--is-focused': isFocused,
                    'option--is-selected': isSelected,
                },
                className
            )}
            {...innerProps}
        >
            {children}
        </div>
    );
};

interface SelectProps {
    options: option[];
    ref?: ForwardedRef<SelectInstance>;
    isClearable?: boolean;
    defaultValue?: option;
    value?: option;
    title?: string;
    styles?: StylesConfig<option, false>;
    onChange: (selectedItem: option) => void;
    noOptionsMessage?: () => string;
}

const customStyles: StylesConfig<option, false> = {
    option: (defaultStyles, state) => ({
        ...defaultStyles,
        borderBottom: '2px solid #e9262c',
        fontSize: '18px',
        borderRadius: '3px',
        fontWeight: 600, color: state.isSelected ? "#FFFFFF" : "#1B0E17",
        backgroundColor: state.isSelected ? "#B99999" : "#FFFFFF",
        height: '80%',
    }),

    menuList: (defaultStyles) => ({
        ...defaultStyles,
        padding: '0px',
        marginTop: '-1px',
    }),

    dropdownIndicator: () => ({
        display: 'none',
    }),

    indicatorsContainer: () => ({ display: 'none' }),

    container: (defaultStyles) => ({
        ...defaultStyles,
        margin: '0px',
    }),

    control: (defaultStyles) => ({
        ...defaultStyles,
        backgroundColor: "#FFFFFF",
        border: "none",
        fontSize: '18px',
        boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#212529" }),
};


const MarkSelect: FC<SelectProps> = forwardRef<
    SelectInstance,
    SelectProps
>(({ options, onChange, ...props }) => {
    return (
        <Select
            className={classes.Select}
            closeMenuOnSelect={true}
            components={{ Option }}
            placeholder=""
            styles={customStyles}
            options={options}
            onChange={(newValue: unknown) => onChange(newValue as option)}
            defaultValue={props.defaultValue}
            isClearable={props.isClearable}
            noOptionsMessage={props.noOptionsMessage}
            value={props.value}
        />
    );
});

export default MarkSelect;

