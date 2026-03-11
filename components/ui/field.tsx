import { Field as BaseField } from "@base-ui/react/field";
import { cn } from "@/lib/utils";

const Control = BaseField.Control;
const Validity = BaseField.Validity;

type FieldRootProps = React.ComponentProps<typeof BaseField.Root>;

function FieldRoot({ className, ...props }: FieldRootProps) {
  return (
    <BaseField.Root
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

type FieldLabelProps = React.ComponentProps<typeof BaseField.Label> & {
  required?: boolean;
};

function FieldLabel({
  required,
  className,
  children,
  ...props
}: FieldLabelProps) {
  return (
    <BaseField.Label
      className={cn(
        "text-sm font-medium text-text data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-danger" aria-hidden="true">
          *
        </span>
      )}
    </BaseField.Label>
  );
}

type FieldDescriptionProps = React.ComponentProps<typeof BaseField.Description>;

function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description
      className={cn("text-sm text-text-muted", className)}
      {...props}
    />
  );
}

type FieldItemProps = React.ComponentProps<typeof BaseField.Item>;

function FieldItem({ className, ...props }: FieldItemProps) {
  return (
    <BaseField.Item
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  );
}

type FieldErrorProps = React.ComponentProps<typeof BaseField.Error>;

function FieldError({ className, ...props }: FieldErrorProps) {
  return (
    <BaseField.Error
      role="alert"
      className={cn("text-sm text-danger", className)}
      {...props}
    />
  );
}

const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Control,
  Item: FieldItem,
  Error: FieldError,
  Validity,
};

export {
  Control as FieldControl,
  Field,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldRoot,
  Validity as FieldValidity,
};
