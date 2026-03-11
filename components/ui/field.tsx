/**
 * Field
 *
 * Thin design-system wrappers around Base UI Field primitives.
 *
 * @parts Field.Root, Field.Label, Field.Description, Field.Control, Field.Item, Field.Error, Field.Validity
 *
 * @usage
 * - Use `Field.Root` to scope labels, descriptions, errors, and controls.
 * - Use `Field.Control` directly for custom controls, or pair `Field.Root`
 *   with field-aware primitives like `Input`, `Textarea`, `Select`, `Checkbox`,
 *   `Radio`, and `Switch`.
 * - Use `Field.Item` for nested field items, such as radio groups.
 *
 * @example
 * ```tsx
 * <Field.Root invalid>
 *   <Field.Label required>Email</Field.Label>
 *   <Input type="email" placeholder="you@example.com" />
 *   <Field.Error>Email is required.</Field.Error>
 * </Field.Root>
 * ```
 */

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

// `required` is a presentational affordance for the label marker.
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
