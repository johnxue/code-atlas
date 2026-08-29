// Auto-generated from src/node-types.json (nielsenko/tree-sitter-dart @ b57d734c)
type dartTypes = {
  "_declaration": {
    "type": "_declaration",
    "named": true,
    "subtypes": [
      {
        "type": "class_declaration",
        "named": true
      },
      {
        "type": "enum_declaration",
        "named": true
      },
      {
        "type": "extension_declaration",
        "named": true
      },
      {
        "type": "extension_type_declaration",
        "named": true
      },
      {
        "type": "mixin_declaration",
        "named": true
      },
      {
        "type": "type_alias",
        "named": true
      }
    ]
  },
  "_instantiation": {
    "type": "_instantiation",
    "named": true,
    "subtypes": [
      {
        "type": "const_object_expression",
        "named": true
      },
      {
        "type": "constructor_invocation",
        "named": true
      },
      {
        "type": "new_expression",
        "named": true
      }
    ]
  },
  "_literal": {
    "type": "_literal",
    "named": true,
    "subtypes": [
      {
        "type": "decimal_floating_point_literal",
        "named": true
      },
      {
        "type": "decimal_integer_literal",
        "named": true
      },
      {
        "type": "false",
        "named": true
      },
      {
        "type": "hex_integer_literal",
        "named": true
      },
      {
        "type": "list_literal",
        "named": true
      },
      {
        "type": "null_literal",
        "named": true
      },
      {
        "type": "record_literal",
        "named": true
      },
      {
        "type": "set_or_map_literal",
        "named": true
      },
      {
        "type": "string_literal",
        "named": true
      },
      {
        "type": "symbol_literal",
        "named": true
      },
      {
        "type": "true",
        "named": true
      }
    ]
  },
  "_statement": {
    "type": "_statement",
    "named": true,
    "subtypes": [
      {
        "type": "assert_statement",
        "named": true
      },
      {
        "type": "block",
        "named": true
      },
      {
        "type": "break_statement",
        "named": true
      },
      {
        "type": "continue_statement",
        "named": true
      },
      {
        "type": "do_statement",
        "named": true
      },
      {
        "type": "empty_statement",
        "named": true
      },
      {
        "type": "expression_statement",
        "named": true
      },
      {
        "type": "for_statement",
        "named": true
      },
      {
        "type": "if_statement",
        "named": true
      },
      {
        "type": "labeled_statement",
        "named": true
      },
      {
        "type": "local_function_declaration",
        "named": true
      },
      {
        "type": "local_variable_declaration",
        "named": true
      },
      {
        "type": "rethrow_statement",
        "named": true
      },
      {
        "type": "return_statement",
        "named": true
      },
      {
        "type": "switch_statement",
        "named": true
      },
      {
        "type": "try_statement",
        "named": true
      },
      {
        "type": "while_statement",
        "named": true
      },
      {
        "type": "yield_each_statement",
        "named": true
      },
      {
        "type": "yield_statement",
        "named": true
      }
    ]
  },
  "additive_expression": {
    "type": "additive_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "annotation": {
    "type": "annotation",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "qualified",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation_arguments",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        }
      ]
    }
  },
  "annotation_arguments": {
    "type": "annotation_arguments",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "annotation_open_paren",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "named_argument",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "arguments": {
    "type": "arguments",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "named_argument",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "assert_statement": {
    "type": "assert_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "assertion",
          "named": true
        }
      ]
    }
  },
  "assertion": {
    "type": "assertion",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "assignable_expression": {
    "type": "assignable_expression",
    "named": true,
    "fields": {
      "index": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "object": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      },
      "property": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "assignment_expression": {
    "type": "assignment_expression",
    "named": true,
    "fields": {
      "left": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "assignable_expression",
            "named": true
          }
        ]
      },
      "operator": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "%=",
            "named": false
          },
          {
            "type": "&=",
            "named": false
          },
          {
            "type": "*=",
            "named": false
          },
          {
            "type": "+=",
            "named": false
          },
          {
            "type": "-=",
            "named": false
          },
          {
            "type": "/=",
            "named": false
          },
          {
            "type": "<<=",
            "named": false
          },
          {
            "type": "=",
            "named": false
          },
          {
            "type": ">>=",
            "named": false
          },
          {
            "type": ">>>=",
            "named": false
          },
          {
            "type": "??=",
            "named": false
          },
          {
            "type": "^=",
            "named": false
          },
          {
            "type": "|=",
            "named": false
          },
          {
            "type": "~/=",
            "named": false
          }
        ]
      },
      "right": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "await_expression": {
    "type": "await_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "binary_operator": {
    "type": "binary_operator",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "relational_operator",
          "named": true
        }
      ]
    }
  },
  "bitwise_and_expression": {
    "type": "bitwise_and_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "bitwise_or_expression": {
    "type": "bitwise_or_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "bitwise_xor_expression": {
    "type": "bitwise_xor_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "block": {
    "type": "block",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        }
      ]
    }
  },
  "break_statement": {
    "type": "break_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "call_expression": {
    "type": "call_expression",
    "named": true,
    "fields": {
      "arguments": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "arguments",
            "named": true
          }
        ]
      },
      "function": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      }
    }
  },
  "cascade_call_expression": {
    "type": "cascade_call_expression",
    "named": true,
    "fields": {
      "arguments": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "arguments",
            "named": true
          }
        ]
      },
      "function": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "cascade_call_expression",
            "named": true
          },
          {
            "type": "cascade_index_expression",
            "named": true
          },
          {
            "type": "cascade_member_expression",
            "named": true
          },
          {
            "type": "cascade_null_assertion_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_index_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_member_expression",
            "named": true
          },
          {
            "type": "cascade_selector",
            "named": true
          }
        ]
      },
      "property": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type_arguments": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_arguments",
            "named": true
          }
        ]
      }
    }
  },
  "cascade_index_expression": {
    "type": "cascade_index_expression",
    "named": true,
    "fields": {
      "index": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "cascade_call_expression",
            "named": true
          },
          {
            "type": "cascade_index_expression",
            "named": true
          },
          {
            "type": "cascade_member_expression",
            "named": true
          },
          {
            "type": "cascade_null_assertion_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_index_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_member_expression",
            "named": true
          },
          {
            "type": "cascade_selector",
            "named": true
          }
        ]
      }
    }
  },
  "cascade_member_expression": {
    "type": "cascade_member_expression",
    "named": true,
    "fields": {
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "cascade_call_expression",
            "named": true
          },
          {
            "type": "cascade_index_expression",
            "named": true
          },
          {
            "type": "cascade_member_expression",
            "named": true
          },
          {
            "type": "cascade_null_assertion_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_index_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_member_expression",
            "named": true
          },
          {
            "type": "cascade_selector",
            "named": true
          }
        ]
      },
      "property": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    }
  },
  "cascade_null_assertion_expression": {
    "type": "cascade_null_assertion_expression",
    "named": true,
    "fields": {
      "value": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "cascade_call_expression",
            "named": true
          },
          {
            "type": "cascade_index_expression",
            "named": true
          },
          {
            "type": "cascade_member_expression",
            "named": true
          },
          {
            "type": "cascade_null_assertion_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_index_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_member_expression",
            "named": true
          },
          {
            "type": "cascade_selector",
            "named": true
          }
        ]
      }
    }
  },
  "cascade_null_aware_index_expression": {
    "type": "cascade_null_aware_index_expression",
    "named": true,
    "fields": {
      "index": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "cascade_call_expression",
            "named": true
          },
          {
            "type": "cascade_index_expression",
            "named": true
          },
          {
            "type": "cascade_member_expression",
            "named": true
          },
          {
            "type": "cascade_null_assertion_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_index_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_member_expression",
            "named": true
          },
          {
            "type": "cascade_selector",
            "named": true
          }
        ]
      }
    }
  },
  "cascade_null_aware_member_expression": {
    "type": "cascade_null_aware_member_expression",
    "named": true,
    "fields": {
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "cascade_call_expression",
            "named": true
          },
          {
            "type": "cascade_index_expression",
            "named": true
          },
          {
            "type": "cascade_member_expression",
            "named": true
          },
          {
            "type": "cascade_null_assertion_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_index_expression",
            "named": true
          },
          {
            "type": "cascade_null_aware_member_expression",
            "named": true
          },
          {
            "type": "cascade_selector",
            "named": true
          }
        ]
      },
      "property": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    }
  },
  "cascade_section": {
    "type": "cascade_section",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_call_expression",
          "named": true
        },
        {
          "type": "cascade_index_expression",
          "named": true
        },
        {
          "type": "cascade_member_expression",
          "named": true
        },
        {
          "type": "cascade_null_assertion_expression",
          "named": true
        },
        {
          "type": "cascade_null_aware_index_expression",
          "named": true
        },
        {
          "type": "cascade_null_aware_member_expression",
          "named": true
        },
        {
          "type": "cascade_selector",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "cascade_selector": {
    "type": "cascade_selector",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "cast_pattern": {
    "type": "cast_pattern",
    "named": true,
    "fields": {
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "catch_clause": {
    "type": "catch_clause",
    "named": true,
    "fields": {
      "exception": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "stack_trace": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    }
  },
  "class_body": {
    "type": "class_body",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "class_member",
          "named": true
        }
      ]
    }
  },
  "class_declaration": {
    "type": "class_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "class_body",
            "named": true
          }
        ]
      },
      "interfaces": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "interfaces",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "superclass": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "superclass",
            "named": true
          }
        ]
      },
      "type_parameters": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_parameters",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "mixin_application_class",
          "named": true
        }
      ]
    }
  },
  "class_member": {
    "type": "class_member",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "declaration",
          "named": true
        },
        {
          "type": "method_declaration",
          "named": true
        }
      ]
    }
  },
  "combinator": {
    "type": "combinator",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "comment": {
    "type": "comment",
    "named": true,
    "extra": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "block_comment",
          "named": true
        },
        {
          "type": "documentation_block_comment",
          "named": true
        }
      ]
    }
  },
  "conditional_expression": {
    "type": "conditional_expression",
    "named": true,
    "fields": {
      "alternative": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "consequence": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "configurable_uri": {
    "type": "configurable_uri",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "configuration_uri",
          "named": true
        },
        {
          "type": "uri",
          "named": true
        }
      ]
    }
  },
  "configuration_uri": {
    "type": "configuration_uri",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "uri",
          "named": true
        },
        {
          "type": "uri_test",
          "named": true
        }
      ]
    }
  },
  "const_object_expression": {
    "type": "const_object_expression",
    "named": true,
    "fields": {
      "arguments": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "arguments",
            "named": true
          }
        ]
      },
      "constructor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "constant_constructor_signature": {
    "type": "constant_constructor_signature",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": ".",
            "named": false
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "new",
            "named": false
          }
        ]
      },
      "parameters": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          }
        ]
      }
    }
  },
  "constant_pattern": {
    "type": "constant_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "for_element",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_element",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "label",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_element",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_aware_pair",
          "named": true
        },
        {
          "type": "pair",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "qualified",
          "named": true
        },
        {
          "type": "record_field",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "spread_element",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "constructor_invocation": {
    "type": "constructor_invocation",
    "named": true,
    "fields": {
      "arguments": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "arguments",
            "named": true
          }
        ]
      },
      "constructor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": ".",
            "named": false
          },
          {
            "type": "type_identifier",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "type_arguments",
          "named": true
        }
      ]
    }
  },
  "constructor_param": {
    "type": "constructor_param",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "formal_parameter_list",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "constructor_signature": {
    "type": "constructor_signature",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": ".",
            "named": false
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "new",
            "named": false
          }
        ]
      },
      "parameters": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          }
        ]
      }
    }
  },
  "constructor_tearoff": {
    "type": "constructor_tearoff",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "type_arguments",
          "named": true
        },
        {
          "type": "type_identifier",
          "named": true
        }
      ]
    }
  },
  "continue_statement": {
    "type": "continue_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "declaration": {
    "type": "declaration",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "constant_constructor_signature",
          "named": true
        },
        {
          "type": "constructor_signature",
          "named": true
        },
        {
          "type": "external",
          "named": true
        },
        {
          "type": "factory_constructor_signature",
          "named": true
        },
        {
          "type": "function_signature",
          "named": true
        },
        {
          "type": "getter_signature",
          "named": true
        },
        {
          "type": "identifier_list",
          "named": true
        },
        {
          "type": "initialized_identifier_list",
          "named": true
        },
        {
          "type": "initializers",
          "named": true
        },
        {
          "type": "operator_signature",
          "named": true
        },
        {
          "type": "redirecting_factory_constructor_signature",
          "named": true
        },
        {
          "type": "redirection",
          "named": true
        },
        {
          "type": "setter_signature",
          "named": true
        },
        {
          "type": "static_final_declaration_list",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "do_statement": {
    "type": "do_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "parenthesized_expression",
            "named": true
          }
        ]
      }
    }
  },
  "dotted_identifier_list": {
    "type": "dotted_identifier_list",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "empty_statement": {
    "type": "empty_statement",
    "named": true,
    "fields": {}
  },
  "enum_body": {
    "type": "enum_body",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "class_member",
          "named": true
        },
        {
          "type": "enum_constant",
          "named": true
        }
      ]
    }
  },
  "enum_constant": {
    "type": "enum_constant",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "arguments",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        }
      ]
    }
  },
  "enum_declaration": {
    "type": "enum_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "enum_body",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "interfaces",
          "named": true
        },
        {
          "type": "mixins",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "equality_expression": {
    "type": "equality_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "escape_sequence": {
    "type": "escape_sequence",
    "named": true,
    "fields": {}
  },
  "expression_statement": {
    "type": "expression_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "extension_body": {
    "type": "extension_body",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "class_member",
          "named": true
        }
      ]
    }
  },
  "extension_declaration": {
    "type": "extension_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "extension_body",
            "named": true
          }
        ]
      },
      "class": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type_parameters": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_parameters",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "extension_type_declaration": {
    "type": "extension_type_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "class_body",
            "named": true
          }
        ]
      },
      "interfaces": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "interfaces",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "extension_type_name",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "representation": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "extension_type_representation",
            "named": true
          }
        ]
      },
      "type_parameters": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_parameters",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "extension_type_name": {
    "type": "extension_type_name",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "extension_type_representation": {
    "type": "extension_type_representation",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "external": {
    "type": "external",
    "named": true,
    "subtypes": [
      {
        "type": "external",
        "named": true
      },
      {
        "type": "external",
        "named": false
      }
    ]
  },
  "external_function_declaration": {
    "type": "external_function_declaration",
    "named": true,
    "fields": {
      "modifier": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "external",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "external_getter_declaration": {
    "type": "external_getter_declaration",
    "named": true,
    "fields": {
      "modifier": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "external",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "getter_signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "external_setter_declaration": {
    "type": "external_setter_declaration",
    "named": true,
    "fields": {
      "modifier": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "external",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "setter_signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "external_variable_declaration": {
    "type": "external_variable_declaration",
    "named": true,
    "fields": {
      "modifier": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "external",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "identifier_list",
          "named": true
        }
      ]
    }
  },
  "factory_constructor_signature": {
    "type": "factory_constructor_signature",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": ".",
            "named": false
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "new",
            "named": false
          }
        ]
      },
      "parameters": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          }
        ]
      }
    }
  },
  "field_initializer": {
    "type": "field_initializer",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "finally_clause": {
    "type": "finally_clause",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "block",
          "named": true
        }
      ]
    }
  },
  "for_element": {
    "type": "for_element",
    "named": true,
    "fields": {
      "body": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "for_element",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_element",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_element",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "null_aware_pair",
            "named": true
          },
          {
            "type": "pair",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "spread_element",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "init": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "local_variable_declaration",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "update": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "for_statement": {
    "type": "for_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "init": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "local_variable_declaration",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "update": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "formal_parameter": {
    "type": "formal_parameter",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "constructor_param",
          "named": true
        },
        {
          "type": "formal_parameter_list",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "super_formal_parameter",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "formal_parameter_list": {
    "type": "formal_parameter_list",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "formal_parameter",
          "named": true
        },
        {
          "type": "optional_formal_parameters",
          "named": true
        }
      ]
    }
  },
  "function_body": {
    "type": "function_body",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "block",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "native",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "function_declaration": {
    "type": "function_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_body",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "function_expression": {
    "type": "function_expression",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_expression_body",
            "named": true
          }
        ]
      },
      "parameters": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          },
          {
            "type": "type_parameters",
            "named": true
          }
        ]
      }
    }
  },
  "function_expression_body": {
    "type": "function_expression_body",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "block",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "function_signature": {
    "type": "function_signature",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "parameters": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          },
          {
            "type": "type_parameters",
            "named": true
          }
        ]
      },
      "return_type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "function_type": {
    "type": "function_type",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "parameter_type_list",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "getter_declaration": {
    "type": "getter_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_body",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "getter_signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "getter_signature": {
    "type": "getter_signature",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "return_type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "identifier": {
    "type": "identifier",
    "named": true,
    "fields": {}
  },
  "identifier_list": {
    "type": "identifier_list",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "if_element": {
    "type": "if_element",
    "named": true,
    "fields": {
      "alternative": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "for_element",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_element",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_element",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "null_aware_pair",
            "named": true
          },
          {
            "type": "pair",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "spread_element",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "consequence": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "for_element",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_element",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_element",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "null_aware_pair",
            "named": true
          },
          {
            "type": "pair",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "spread_element",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "if_null_expression": {
    "type": "if_null_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "if_statement": {
    "type": "if_statement",
    "named": true,
    "fields": {
      "alternative": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      },
      "consequence": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "import_or_export": {
    "type": "import_or_export",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "library_export",
          "named": true
        },
        {
          "type": "library_import",
          "named": true
        }
      ]
    }
  },
  "import_specification": {
    "type": "import_specification",
    "named": true,
    "fields": {
      "alias": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "uri": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "configurable_uri",
            "named": true
          },
          {
            "type": "uri",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "combinator",
          "named": true
        }
      ]
    }
  },
  "index_expression": {
    "type": "index_expression",
    "named": true,
    "fields": {
      "index": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      }
    }
  },
  "initialized_identifier": {
    "type": "initialized_identifier",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "initialized_identifier_list": {
    "type": "initialized_identifier_list",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "initialized_identifier",
          "named": true
        }
      ]
    }
  },
  "initialized_variable_definition": {
    "type": "initialized_variable_definition",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "initialized_identifier",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "initializer_list_entry": {
    "type": "initializer_list_entry",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "arguments",
          "named": true
        },
        {
          "type": "assertion",
          "named": true
        },
        {
          "type": "field_initializer",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "initializers": {
    "type": "initializers",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "initializer_list_entry",
          "named": true
        }
      ]
    }
  },
  "instantiation_expression": {
    "type": "instantiation_expression",
    "named": true,
    "fields": {
      "function": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      },
      "type_arguments": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type_arguments",
            "named": true
          }
        ]
      }
    }
  },
  "interfaces": {
    "type": "interfaces",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "is_operator": {
    "type": "is_operator",
    "named": true,
    "fields": {}
  },
  "label": {
    "type": "label",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "labeled_statement": {
    "type": "labeled_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_statement",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "library_export": {
    "type": "library_export",
    "named": true,
    "fields": {
      "uri": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "configurable_uri",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "combinator",
          "named": true
        }
      ]
    }
  },
  "library_import": {
    "type": "library_import",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "import_specification",
          "named": true
        }
      ]
    }
  },
  "library_name": {
    "type": "library_name",
    "named": true,
    "fields": {
      "uri": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "uri",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "dotted_identifier_list",
          "named": true
        }
      ]
    }
  },
  "list_literal": {
    "type": "list_literal",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "for_element",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_element",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_element",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_aware_pair",
          "named": true
        },
        {
          "type": "pair",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "spread_element",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "list_pattern": {
    "type": "list_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "rest_pattern",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "local_function_declaration": {
    "type": "local_function_declaration",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "function_body",
          "named": true
        },
        {
          "type": "function_signature",
          "named": true
        }
      ]
    }
  },
  "local_variable_declaration": {
    "type": "local_variable_declaration",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "initialized_variable_definition",
          "named": true
        },
        {
          "type": "pattern_variable_declaration",
          "named": true
        }
      ]
    }
  },
  "logical_and_expression": {
    "type": "logical_and_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "logical_or_expression": {
    "type": "logical_or_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "map_pattern": {
    "type": "map_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "rest_pattern",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "member_expression": {
    "type": "member_expression",
    "named": true,
    "fields": {
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      },
      "property": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    }
  },
  "method_declaration": {
    "type": "method_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_body",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "method_signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "method_signature": {
    "type": "method_signature",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "constructor_signature",
          "named": true
        },
        {
          "type": "factory_constructor_signature",
          "named": true
        },
        {
          "type": "function_signature",
          "named": true
        },
        {
          "type": "getter_signature",
          "named": true
        },
        {
          "type": "initializers",
          "named": true
        },
        {
          "type": "operator_signature",
          "named": true
        },
        {
          "type": "setter_signature",
          "named": true
        }
      ]
    }
  },
  "mixin_application": {
    "type": "mixin_application",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "interfaces",
          "named": true
        },
        {
          "type": "mixins",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "mixin_application_class": {
    "type": "mixin_application_class",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "mixin_application",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "mixin_declaration": {
    "type": "mixin_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "class_body",
            "named": true
          }
        ]
      },
      "interfaces": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "interfaces",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type_parameters": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type_parameters",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "mixins": {
    "type": "mixins",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "multiplicative_expression": {
    "type": "multiplicative_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "named_argument": {
    "type": "named_argument",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "label",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "named_parameter_types": {
    "type": "named_parameter_types",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "typed_identifier",
          "named": true
        }
      ]
    }
  },
  "native": {
    "type": "native",
    "named": true,
    "subtypes": [
      {
        "type": "native",
        "named": true
      },
      {
        "type": "native",
        "named": false
      }
    ]
  },
  "negate_operator": {
    "type": "negate_operator",
    "named": true,
    "fields": {}
  },
  "new_expression": {
    "type": "new_expression",
    "named": true,
    "fields": {
      "arguments": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "arguments",
            "named": true
          }
        ]
      },
      "constructor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "normal_parameter_type": {
    "type": "normal_parameter_type",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "typed_identifier",
          "named": true
        }
      ]
    }
  },
  "null_assert_pattern": {
    "type": "null_assert_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "null_assertion_expression": {
    "type": "null_assertion_expression",
    "named": true,
    "fields": {
      "value": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      }
    }
  },
  "null_aware_element": {
    "type": "null_aware_element",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "null_aware_index_expression": {
    "type": "null_aware_index_expression",
    "named": true,
    "fields": {
      "index": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      }
    }
  },
  "null_aware_member_expression": {
    "type": "null_aware_member_expression",
    "named": true,
    "fields": {
      "object": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          }
        ]
      },
      "property": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    }
  },
  "null_aware_pair": {
    "type": "null_aware_pair",
    "named": true,
    "fields": {
      "key": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_element",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "null_check_pattern": {
    "type": "null_check_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "object_pattern": {
    "type": "object_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "label",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_identifier",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "operator_signature": {
    "type": "operator_signature",
    "named": true,
    "fields": {
      "operator": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "[]",
            "named": false
          },
          {
            "type": "[]=",
            "named": false
          },
          {
            "type": "binary_operator",
            "named": true
          },
          {
            "type": "~",
            "named": false
          }
        ]
      },
      "parameters": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          }
        ]
      },
      "return_type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "optional_formal_parameters": {
    "type": "optional_formal_parameters",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "formal_parameter",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "optional_parameter_types": {
    "type": "optional_parameter_types",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "named_parameter_types",
          "named": true
        },
        {
          "type": "optional_positional_parameter_types",
          "named": true
        }
      ]
    }
  },
  "optional_positional_parameter_types": {
    "type": "optional_positional_parameter_types",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "normal_parameter_type",
          "named": true
        }
      ]
    }
  },
  "pair": {
    "type": "pair",
    "named": true,
    "fields": {
      "key": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_element",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "parameter_type_list": {
    "type": "parameter_type_list",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "normal_parameter_type",
          "named": true
        },
        {
          "type": "optional_parameter_types",
          "named": true
        }
      ]
    }
  },
  "parenthesized_expression": {
    "type": "parenthesized_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "part_directive": {
    "type": "part_directive",
    "named": true,
    "fields": {
      "uri": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "uri",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "part_of_directive": {
    "type": "part_of_directive",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "dotted_identifier_list",
          "named": true
        },
        {
          "type": "uri",
          "named": true
        }
      ]
    }
  },
  "pattern_assignment": {
    "type": "pattern_assignment",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "pattern_variable_declaration": {
    "type": "pattern_variable_declaration",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "postfix_expression": {
    "type": "postfix_expression",
    "named": true,
    "fields": {
      "argument": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "assignable_expression",
            "named": true
          }
        ]
      }
    }
  },
  "prefix_operator": {
    "type": "prefix_operator",
    "named": true,
    "fields": {}
  },
  "qualified": {
    "type": "qualified",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "type_identifier",
          "named": true
        }
      ]
    }
  },
  "raw_string_literal_double_quotes": {
    "type": "raw_string_literal_double_quotes",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "template_chars_double_single",
          "named": true
        },
        {
          "type": "template_chars_raw_slash",
          "named": true
        }
      ]
    }
  },
  "raw_string_literal_double_quotes_multiple": {
    "type": "raw_string_literal_double_quotes_multiple",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "template_chars_double",
          "named": true
        },
        {
          "type": "template_chars_raw_slash",
          "named": true
        }
      ]
    }
  },
  "raw_string_literal_single_quotes": {
    "type": "raw_string_literal_single_quotes",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "template_chars_raw_slash",
          "named": true
        },
        {
          "type": "template_chars_single_single",
          "named": true
        }
      ]
    }
  },
  "raw_string_literal_single_quotes_multiple": {
    "type": "raw_string_literal_single_quotes_multiple",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "template_chars_raw_slash",
          "named": true
        },
        {
          "type": "template_chars_single",
          "named": true
        }
      ]
    }
  },
  "record_field": {
    "type": "record_field",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "label",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "record_literal": {
    "type": "record_literal",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "label",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_field",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "record_pattern": {
    "type": "record_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "label",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "record_type": {
    "type": "record_type",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "record_type_field",
          "named": true
        },
        {
          "type": "record_type_named_field",
          "named": true
        }
      ]
    }
  },
  "record_type_field": {
    "type": "record_type_field",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "record_type_named_field": {
    "type": "record_type_named_field",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "typed_identifier",
          "named": true
        }
      ]
    }
  },
  "redirecting_factory_constructor_signature": {
    "type": "redirecting_factory_constructor_signature",
    "named": true,
    "fields": {
      "name": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": ".",
            "named": false
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "new",
            "named": false
          }
        ]
      },
      "parameters": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          }
        ]
      },
      "target": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      },
      "target_constructor": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    }
  },
  "redirection": {
    "type": "redirection",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "arguments",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "relational_expression": {
    "type": "relational_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "relational_operator": {
    "type": "relational_operator",
    "named": true,
    "fields": {}
  },
  "rest_pattern": {
    "type": "rest_pattern",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "rethrow_statement": {
    "type": "rethrow_statement",
    "named": true,
    "fields": {}
  },
  "return_statement": {
    "type": "return_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "script_tag": {
    "type": "script_tag",
    "named": true,
    "fields": {}
  },
  "set_or_map_literal": {
    "type": "set_or_map_literal",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "for_element",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_element",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_element",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_aware_pair",
          "named": true
        },
        {
          "type": "pair",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "spread_element",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_arguments",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "setter_declaration": {
    "type": "setter_declaration",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "function_body",
            "named": true
          }
        ]
      },
      "signature": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "setter_signature",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "setter_signature": {
    "type": "setter_signature",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "parameters": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "formal_parameter_list",
            "named": true
          },
          {
            "type": "type_parameters",
            "named": true
          }
        ]
      },
      "return_type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "shift_expression": {
    "type": "shift_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "source_file": {
    "type": "source_file",
    "named": true,
    "root": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_declaration",
          "named": true
        },
        {
          "type": "external_function_declaration",
          "named": true
        },
        {
          "type": "external_getter_declaration",
          "named": true
        },
        {
          "type": "external_setter_declaration",
          "named": true
        },
        {
          "type": "external_variable_declaration",
          "named": true
        },
        {
          "type": "function_declaration",
          "named": true
        },
        {
          "type": "getter_declaration",
          "named": true
        },
        {
          "type": "import_or_export",
          "named": true
        },
        {
          "type": "library_name",
          "named": true
        },
        {
          "type": "part_directive",
          "named": true
        },
        {
          "type": "part_of_directive",
          "named": true
        },
        {
          "type": "script_tag",
          "named": true
        },
        {
          "type": "setter_declaration",
          "named": true
        },
        {
          "type": "top_level_variable_declaration",
          "named": true
        }
      ]
    }
  },
  "spread_element": {
    "type": "spread_element",
    "named": true,
    "fields": {
      "value": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "static_final_declaration": {
    "type": "static_final_declaration",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "value": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "static_final_declaration_list": {
    "type": "static_final_declaration_list",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "static_final_declaration",
          "named": true
        }
      ]
    }
  },
  "static_member_shorthand": {
    "type": "static_member_shorthand",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "arguments",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "string_literal": {
    "type": "string_literal",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "raw_string_literal_double_quotes",
          "named": true
        },
        {
          "type": "raw_string_literal_double_quotes_multiple",
          "named": true
        },
        {
          "type": "raw_string_literal_single_quotes",
          "named": true
        },
        {
          "type": "raw_string_literal_single_quotes_multiple",
          "named": true
        },
        {
          "type": "string_literal_double_quotes",
          "named": true
        },
        {
          "type": "string_literal_double_quotes_multiple",
          "named": true
        },
        {
          "type": "string_literal_single_quotes",
          "named": true
        },
        {
          "type": "string_literal_single_quotes_multiple",
          "named": true
        }
      ]
    }
  },
  "string_literal_double_quotes": {
    "type": "string_literal_double_quotes",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "escape_sequence",
          "named": true
        },
        {
          "type": "template_chars_double_single",
          "named": true
        },
        {
          "type": "template_substitution",
          "named": true
        }
      ]
    }
  },
  "string_literal_double_quotes_multiple": {
    "type": "string_literal_double_quotes_multiple",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "escape_sequence",
          "named": true
        },
        {
          "type": "template_chars_double",
          "named": true
        },
        {
          "type": "template_substitution",
          "named": true
        }
      ]
    }
  },
  "string_literal_single_quotes": {
    "type": "string_literal_single_quotes",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "escape_sequence",
          "named": true
        },
        {
          "type": "template_chars_single_single",
          "named": true
        },
        {
          "type": "template_substitution",
          "named": true
        }
      ]
    }
  },
  "string_literal_single_quotes_multiple": {
    "type": "string_literal_single_quotes_multiple",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "escape_sequence",
          "named": true
        },
        {
          "type": "template_chars_single",
          "named": true
        },
        {
          "type": "template_substitution",
          "named": true
        }
      ]
    }
  },
  "super_formal_parameter": {
    "type": "super_formal_parameter",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "formal_parameter_list",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "superclass": {
    "type": "superclass",
    "named": true,
    "fields": {
      "type": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "mixins",
          "named": true
        }
      ]
    }
  },
  "switch_block": {
    "type": "switch_block",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "switch_statement_case",
          "named": true
        },
        {
          "type": "switch_statement_default",
          "named": true
        }
      ]
    }
  },
  "switch_expression": {
    "type": "switch_expression",
    "named": true,
    "fields": {
      "body": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": ",",
            "named": false
          },
          {
            "type": "switch_expression_case",
            "named": true
          },
          {
            "type": "{",
            "named": false
          },
          {
            "type": "}",
            "named": false
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "parenthesized_expression",
            "named": true
          }
        ]
      }
    }
  },
  "switch_expression_case": {
    "type": "switch_expression_case",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "switch_statement": {
    "type": "switch_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "switch_block",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "parenthesized_expression",
            "named": true
          }
        ]
      }
    }
  },
  "switch_statement_case": {
    "type": "switch_statement_case",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "_statement",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "cast_pattern",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constant_pattern",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "label",
          "named": true
        },
        {
          "type": "list_pattern",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "map_pattern",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assert_pattern",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "null_check_pattern",
          "named": true
        },
        {
          "type": "object_pattern",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "record_pattern",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "relational_operator",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        },
        {
          "type": "variable_pattern",
          "named": true
        }
      ]
    }
  },
  "switch_statement_default": {
    "type": "switch_statement_default",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_statement",
          "named": true
        },
        {
          "type": "label",
          "named": true
        }
      ]
    }
  },
  "symbol_literal": {
    "type": "symbol_literal",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "binary_operator",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        }
      ]
    }
  },
  "template_substitution": {
    "type": "template_substitution",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "identifier_dollar_escaped",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "throw_expression": {
    "type": "throw_expression",
    "named": true,
    "fields": {
      "value": {
        "multiple": true,
        "required": true,
        "types": [
          {
            "type": "_instantiation",
            "named": true
          },
          {
            "type": "_literal",
            "named": true
          },
          {
            "type": "additive_expression",
            "named": true
          },
          {
            "type": "assignment_expression",
            "named": true
          },
          {
            "type": "bitwise_and_expression",
            "named": true
          },
          {
            "type": "bitwise_or_expression",
            "named": true
          },
          {
            "type": "bitwise_xor_expression",
            "named": true
          },
          {
            "type": "call_expression",
            "named": true
          },
          {
            "type": "cascade_section",
            "named": true
          },
          {
            "type": "conditional_expression",
            "named": true
          },
          {
            "type": "constructor_tearoff",
            "named": true
          },
          {
            "type": "equality_expression",
            "named": true
          },
          {
            "type": "function_expression",
            "named": true
          },
          {
            "type": "identifier",
            "named": true
          },
          {
            "type": "if_null_expression",
            "named": true
          },
          {
            "type": "index_expression",
            "named": true
          },
          {
            "type": "instantiation_expression",
            "named": true
          },
          {
            "type": "logical_and_expression",
            "named": true
          },
          {
            "type": "logical_or_expression",
            "named": true
          },
          {
            "type": "member_expression",
            "named": true
          },
          {
            "type": "multiplicative_expression",
            "named": true
          },
          {
            "type": "null_assertion_expression",
            "named": true
          },
          {
            "type": "null_aware_index_expression",
            "named": true
          },
          {
            "type": "null_aware_member_expression",
            "named": true
          },
          {
            "type": "parenthesized_expression",
            "named": true
          },
          {
            "type": "pattern_assignment",
            "named": true
          },
          {
            "type": "postfix_expression",
            "named": true
          },
          {
            "type": "relational_expression",
            "named": true
          },
          {
            "type": "shift_expression",
            "named": true
          },
          {
            "type": "static_member_shorthand",
            "named": true
          },
          {
            "type": "super",
            "named": false
          },
          {
            "type": "switch_expression",
            "named": true
          },
          {
            "type": "this",
            "named": false
          },
          {
            "type": "throw_expression",
            "named": true
          },
          {
            "type": "type_cast_expression",
            "named": true
          },
          {
            "type": "type_test_expression",
            "named": true
          },
          {
            "type": "unary_expression",
            "named": true
          }
        ]
      }
    }
  },
  "top_level_variable_declaration": {
    "type": "top_level_variable_declaration",
    "named": true,
    "fields": {
      "modifier": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "const",
            "named": false
          },
          {
            "type": "final",
            "named": false
          },
          {
            "type": "late",
            "named": false
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "initialized_identifier_list",
          "named": true
        },
        {
          "type": "static_final_declaration_list",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "try_statement": {
    "type": "try_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "block",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "block",
          "named": true
        },
        {
          "type": "catch_clause",
          "named": true
        },
        {
          "type": "finally_clause",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "type": {
    "type": "type",
    "named": true,
    "subtypes": [
      {
        "type": "type",
        "named": true
      },
      {
        "type": "type",
        "named": false
      }
    ]
  },
  "type_alias": {
    "type": "type_alias",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "annotation",
          "named": true
        },
        {
          "type": "formal_parameter_list",
          "named": true
        },
        {
          "type": "type",
          "named": true
        },
        {
          "type": "type_identifier",
          "named": true
        },
        {
          "type": "type_parameters",
          "named": true
        }
      ]
    }
  },
  "type_arguments": {
    "type": "type_arguments",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "type_cast": {
    "type": "type_cast",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "type_cast_expression": {
    "type": "type_cast_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "type_identifier": {
    "type": "type_identifier",
    "named": true,
    "fields": {}
  },
  "type_parameter": {
    "type": "type_parameter",
    "named": true,
    "fields": {
      "bound": {
        "multiple": true,
        "required": false,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      },
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type_identifier",
            "named": true
          }
        ]
      },
      "variance": {
        "multiple": false,
        "required": false,
        "types": [
          {
            "type": "variance_modifier",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "annotation",
          "named": true
        }
      ]
    }
  },
  "type_parameters": {
    "type": "type_parameters",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "type_parameter",
          "named": true
        }
      ]
    }
  },
  "type_test": {
    "type": "type_test",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "is_operator",
          "named": true
        },
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "type_test_expression": {
    "type": "type_test_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "typed_identifier": {
    "type": "typed_identifier",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      },
      "type": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "type",
            "named": true
          }
        ]
      }
    }
  },
  "unary_expression": {
    "type": "unary_expression",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "assignable_expression",
          "named": true
        },
        {
          "type": "await_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "negate_operator",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "prefix_operator",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "uri": {
    "type": "uri",
    "named": true,
    "fields": {},
    "children": {
      "multiple": false,
      "required": true,
      "types": [
        {
          "type": "string_literal",
          "named": true
        }
      ]
    }
  },
  "uri_test": {
    "type": "uri_test",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": true,
      "types": [
        {
          "type": "dotted_identifier_list",
          "named": true
        },
        {
          "type": "string_literal",
          "named": true
        }
      ]
    }
  },
  "variable_pattern": {
    "type": "variable_pattern",
    "named": true,
    "fields": {
      "name": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "identifier",
            "named": true
          }
        ]
      }
    },
    "children": {
      "multiple": false,
      "required": false,
      "types": [
        {
          "type": "type",
          "named": true
        }
      ]
    }
  },
  "variance_modifier": {
    "type": "variance_modifier",
    "named": true,
    "fields": {}
  },
  "while_statement": {
    "type": "while_statement",
    "named": true,
    "fields": {
      "body": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "_statement",
            "named": true
          }
        ]
      },
      "condition": {
        "multiple": false,
        "required": true,
        "types": [
          {
            "type": "parenthesized_expression",
            "named": true
          }
        ]
      }
    }
  },
  "yield_each_statement": {
    "type": "yield_each_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "yield_statement": {
    "type": "yield_statement",
    "named": true,
    "fields": {},
    "children": {
      "multiple": true,
      "required": false,
      "types": [
        {
          "type": "_instantiation",
          "named": true
        },
        {
          "type": "_literal",
          "named": true
        },
        {
          "type": "additive_expression",
          "named": true
        },
        {
          "type": "assignment_expression",
          "named": true
        },
        {
          "type": "bitwise_and_expression",
          "named": true
        },
        {
          "type": "bitwise_or_expression",
          "named": true
        },
        {
          "type": "bitwise_xor_expression",
          "named": true
        },
        {
          "type": "call_expression",
          "named": true
        },
        {
          "type": "cascade_section",
          "named": true
        },
        {
          "type": "conditional_expression",
          "named": true
        },
        {
          "type": "constructor_tearoff",
          "named": true
        },
        {
          "type": "equality_expression",
          "named": true
        },
        {
          "type": "function_expression",
          "named": true
        },
        {
          "type": "identifier",
          "named": true
        },
        {
          "type": "if_null_expression",
          "named": true
        },
        {
          "type": "index_expression",
          "named": true
        },
        {
          "type": "instantiation_expression",
          "named": true
        },
        {
          "type": "logical_and_expression",
          "named": true
        },
        {
          "type": "logical_or_expression",
          "named": true
        },
        {
          "type": "member_expression",
          "named": true
        },
        {
          "type": "multiplicative_expression",
          "named": true
        },
        {
          "type": "null_assertion_expression",
          "named": true
        },
        {
          "type": "null_aware_index_expression",
          "named": true
        },
        {
          "type": "null_aware_member_expression",
          "named": true
        },
        {
          "type": "parenthesized_expression",
          "named": true
        },
        {
          "type": "pattern_assignment",
          "named": true
        },
        {
          "type": "postfix_expression",
          "named": true
        },
        {
          "type": "relational_expression",
          "named": true
        },
        {
          "type": "shift_expression",
          "named": true
        },
        {
          "type": "static_member_shorthand",
          "named": true
        },
        {
          "type": "switch_expression",
          "named": true
        },
        {
          "type": "throw_expression",
          "named": true
        },
        {
          "type": "type_cast_expression",
          "named": true
        },
        {
          "type": "type_test_expression",
          "named": true
        },
        {
          "type": "unary_expression",
          "named": true
        }
      ]
    }
  },
  "\n": {
    "type": "\n",
    "named": false
  },
  "!": {
    "type": "!",
    "named": false
  },
  "!=": {
    "type": "!=",
    "named": false
  },
  "\"": {
    "type": "\"",
    "named": false
  },
  "\"\"\"": {
    "type": "\"\"\"",
    "named": false
  },
  "#": {
    "type": "#",
    "named": false
  },
  "#!": {
    "type": "#!",
    "named": false
  },
  "$": {
    "type": "$",
    "named": false
  },
  "%": {
    "type": "%",
    "named": false
  },
  "%=": {
    "type": "%=",
    "named": false
  },
  "&": {
    "type": "&",
    "named": false
  },
  "&&": {
    "type": "&&",
    "named": false
  },
  "&=": {
    "type": "&=",
    "named": false
  },
  "'": {
    "type": "'",
    "named": false
  },
  "'''": {
    "type": "'''",
    "named": false
  },
  "(": {
    "type": "(",
    "named": false
  },
  ")": {
    "type": ")",
    "named": false
  },
  "*": {
    "type": "*",
    "named": false
  },
  "*=": {
    "type": "*=",
    "named": false
  },
  "+": {
    "type": "+",
    "named": false
  },
  "++": {
    "type": "++",
    "named": false
  },
  "+=": {
    "type": "+=",
    "named": false
  },
  ",": {
    "type": ",",
    "named": false
  },
  "-": {
    "type": "-",
    "named": false
  },
  "--": {
    "type": "--",
    "named": false
  },
  "-=": {
    "type": "-=",
    "named": false
  },
  ".": {
    "type": ".",
    "named": false
  },
  "..": {
    "type": "..",
    "named": false
  },
  "...": {
    "type": "...",
    "named": false
  },
  "...?": {
    "type": "...?",
    "named": false
  },
  "/": {
    "type": "/",
    "named": false
  },
  "//": {
    "type": "//",
    "named": false
  },
  "///": {
    "type": "///",
    "named": false
  },
  "/=": {
    "type": "/=",
    "named": false
  },
  ":": {
    "type": ":",
    "named": false
  },
  ";": {
    "type": ";",
    "named": false
  },
  "<": {
    "type": "<",
    "named": false
  },
  "<<": {
    "type": "<<",
    "named": false
  },
  "<<=": {
    "type": "<<=",
    "named": false
  },
  "<=": {
    "type": "<=",
    "named": false
  },
  "=": {
    "type": "=",
    "named": false
  },
  "==": {
    "type": "==",
    "named": false
  },
  "=>": {
    "type": "=>",
    "named": false
  },
  ">": {
    "type": ">",
    "named": false
  },
  ">=": {
    "type": ">=",
    "named": false
  },
  ">>": {
    "type": ">>",
    "named": false
  },
  ">>=": {
    "type": ">>=",
    "named": false
  },
  ">>>": {
    "type": ">>>",
    "named": false
  },
  ">>>=": {
    "type": ">>>=",
    "named": false
  },
  "?": {
    "type": "?",
    "named": false
  },
  "?.": {
    "type": "?.",
    "named": false
  },
  "?..": {
    "type": "?..",
    "named": false
  },
  "??": {
    "type": "??",
    "named": false
  },
  "??=": {
    "type": "??=",
    "named": false
  },
  "@": {
    "type": "@",
    "named": false
  },
  "Function": {
    "type": "Function",
    "named": false
  },
  "[": {
    "type": "[",
    "named": false
  },
  "[]": {
    "type": "[]",
    "named": false
  },
  "[]=": {
    "type": "[]=",
    "named": false
  },
  "]": {
    "type": "]",
    "named": false
  },
  "^": {
    "type": "^",
    "named": false
  },
  "^=": {
    "type": "^=",
    "named": false
  },
  "abstract": {
    "type": "abstract",
    "named": false
  },
  "annotation_open_paren": {
    "type": "annotation_open_paren",
    "named": true
  },
  "as": {
    "type": "as",
    "named": false
  },
  "assert": {
    "type": "assert",
    "named": false
  },
  "async": {
    "type": "async",
    "named": false
  },
  "async*": {
    "type": "async*",
    "named": false
  },
  "augment": {
    "type": "augment",
    "named": false
  },
  "await": {
    "type": "await",
    "named": false
  },
  "base": {
    "type": "base",
    "named": false
  },
  "block_comment": {
    "type": "block_comment",
    "named": true
  },
  "break": {
    "type": "break",
    "named": false
  },
  "case": {
    "type": "case",
    "named": false
  },
  "catch": {
    "type": "catch",
    "named": false
  },
  "class": {
    "type": "class",
    "named": false
  },
  "const": {
    "type": "const",
    "named": false
  },
  "continue": {
    "type": "continue",
    "named": false
  },
  "covariant": {
    "type": "covariant",
    "named": false
  },
  "decimal_floating_point_literal": {
    "type": "decimal_floating_point_literal",
    "named": true
  },
  "decimal_integer_literal": {
    "type": "decimal_integer_literal",
    "named": true
  },
  "default": {
    "type": "default",
    "named": false
  },
  "deferred": {
    "type": "deferred",
    "named": false
  },
  "do": {
    "type": "do",
    "named": false
  },
  "documentation_block_comment": {
    "type": "documentation_block_comment",
    "named": true
  },
  "dynamic": {
    "type": "dynamic",
    "named": false
  },
  "else": {
    "type": "else",
    "named": false
  },
  "enum": {
    "type": "enum",
    "named": false
  },
  "export": {
    "type": "export",
    "named": false
  },
  "extends": {
    "type": "extends",
    "named": false
  },
  "extension": {
    "type": "extension",
    "named": false
  },
  "factory": {
    "type": "factory",
    "named": false
  },
  "false": {
    "type": "false",
    "named": true
  },
  "final": {
    "type": "final",
    "named": false
  },
  "finally": {
    "type": "finally",
    "named": false
  },
  "for": {
    "type": "for",
    "named": false
  },
  "get": {
    "type": "get",
    "named": false
  },
  "hex_integer_literal": {
    "type": "hex_integer_literal",
    "named": true
  },
  "hide": {
    "type": "hide",
    "named": false
  },
  "identifier_dollar_escaped": {
    "type": "identifier_dollar_escaped",
    "named": true
  },
  "if": {
    "type": "if",
    "named": false
  },
  "implements": {
    "type": "implements",
    "named": false
  },
  "import": {
    "type": "import",
    "named": false
  },
  "in": {
    "type": "in",
    "named": false
  },
  "inline": {
    "type": "inline",
    "named": false
  },
  "inout": {
    "type": "inout",
    "named": false
  },
  "interface": {
    "type": "interface",
    "named": false
  },
  "is": {
    "type": "is",
    "named": false
  },
  "late": {
    "type": "late",
    "named": false
  },
  "library": {
    "type": "library",
    "named": false
  },
  "mixin": {
    "type": "mixin",
    "named": false
  },
  "new": {
    "type": "new",
    "named": false
  },
  "null_literal": {
    "type": "null_literal",
    "named": true
  },
  "of": {
    "type": "of",
    "named": false
  },
  "on": {
    "type": "on",
    "named": false
  },
  "operator": {
    "type": "operator",
    "named": false
  },
  "out": {
    "type": "out",
    "named": false
  },
  "part": {
    "type": "part",
    "named": false
  },
  "r\"": {
    "type": "r\"",
    "named": false
  },
  "r\"\"\"": {
    "type": "r\"\"\"",
    "named": false
  },
  "r'": {
    "type": "r'",
    "named": false
  },
  "r'''": {
    "type": "r'''",
    "named": false
  },
  "required": {
    "type": "required",
    "named": false
  },
  "rethrow": {
    "type": "rethrow",
    "named": false
  },
  "return": {
    "type": "return",
    "named": false
  },
  "sealed": {
    "type": "sealed",
    "named": false
  },
  "set": {
    "type": "set",
    "named": false
  },
  "show": {
    "type": "show",
    "named": false
  },
  "static": {
    "type": "static",
    "named": false
  },
  "super": {
    "type": "super",
    "named": false
  },
  "switch": {
    "type": "switch",
    "named": false
  },
  "sync*": {
    "type": "sync*",
    "named": false
  },
  "template_chars_double": {
    "type": "template_chars_double",
    "named": true
  },
  "template_chars_double_single": {
    "type": "template_chars_double_single",
    "named": true
  },
  "template_chars_raw_slash": {
    "type": "template_chars_raw_slash",
    "named": true
  },
  "template_chars_single": {
    "type": "template_chars_single",
    "named": true
  },
  "template_chars_single_single": {
    "type": "template_chars_single_single",
    "named": true
  },
  "this": {
    "type": "this",
    "named": false
  },
  "throw": {
    "type": "throw",
    "named": false
  },
  "true": {
    "type": "true",
    "named": true
  },
  "try": {
    "type": "try",
    "named": false
  },
  "typedef": {
    "type": "typedef",
    "named": false
  },
  "var": {
    "type": "var",
    "named": false
  },
  "void_type": {
    "type": "void_type",
    "named": true
  },
  "when": {
    "type": "when",
    "named": false
  },
  "while": {
    "type": "while",
    "named": false
  },
  "with": {
    "type": "with",
    "named": false
  },
  "yield": {
    "type": "yield",
    "named": false
  },
  "{": {
    "type": "{",
    "named": false
  },
  "|": {
    "type": "|",
    "named": false
  },
  "|=": {
    "type": "|=",
    "named": false
  },
  "||": {
    "type": "||",
    "named": false
  },
  "}": {
    "type": "}",
    "named": false
  },
  "~": {
    "type": "~",
    "named": false
  },
  "~/": {
    "type": "~/",
    "named": false
  },
  "~/=": {
    "type": "~/=",
    "named": false
  },
};
export default dartTypes;
