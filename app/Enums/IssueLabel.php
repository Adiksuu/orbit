<?php

namespace App\Enums;

enum IssueLabel: string
{
    case BUG = 'bug';
    case FEATURE = 'feature';
    case PERFORMANCE = 'performance';
    case DESIGN = 'design';
    case UX = 'ux';
    case CHORE = 'chore';
}
