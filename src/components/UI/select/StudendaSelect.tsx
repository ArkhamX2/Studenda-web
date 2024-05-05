/** @jsxImportSource @emotion/react */
import Select, { OptionProps, SelectInstance } from 'react-select';
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
    onChange: (selectedItem : option) => void; 
    noOptionsMessage?: () => string;
}

const StudendaSelect: FC<SelectProps> = forwardRef<
SelectInstance,
SelectProps
>(({ options, onChange, ...props }, ref) => {
    return (
        <Select
            className={classes.Select}
            closeMenuOnSelect={true}
            components={{ Option }}
            styles={{
                option: (base) => ({
                    ...base,
                    border: `1px dotted`,
                    height: '100%',
                }),
            }}
            options={options}
            onChange={(newValue: unknown) => onChange(newValue as option)}
            defaultValue={props.defaultValue} 
            isClearable={props.isClearable}
            noOptionsMessage={props.noOptionsMessage}
            value={props.value}
        />
    );
});

export default StudendaSelect;

